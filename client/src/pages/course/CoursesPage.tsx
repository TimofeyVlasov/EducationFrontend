import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Layout } from '../../components/layouts';
import './coursesPageStyles.scss'
import { Button, Dialog, DropDown, EnrollmentsList, FilesList, ProgressList, StudentsList, TextField } from '../../components';
import { Student } from '../../types/models';
import { DropDownItem } from '../../components/dropDown/DropDownProps';
import { PencilIcon, PlusIcon, TrashIcon, UploadIcon } from '../../assets/icons';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks';
import { getCourses, addCourse, editCourse, deleteCourse, addStudent, editStudent, deleteStudent, addEnrollment, deleteEnrollment, addStudentProgress, deleteStudentProgress, uploadFile, deleteFile } from '../../services';
import { FilesApi } from '../../api';
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';

export const CoursesPage: FC = () => {
    const { role, accessToken } = useAppSelector((state) => state.user);
    const { courses: coursesData } = useAppSelector((state) => state.courses);
    const dispatch = useAppDispatch();
    const [studentsData, setStudentsData] = useState<Array<Student>>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number>();
    const [selectedStudent, setSelectedStudent] = useState<Student>();
    const [showStudentDialog, setShowStudentDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [userToEdit, setUserToEdit] = useState(0);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');

    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showCourseDialog, setShowCourseDialog] = useState(false);
    const [courseActionMode, setCourseActionMode] = useState<'create' | 'edit'>('create');
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [showEnrollmentDialog, setShowEnrollmentDialog] = useState(false);
    const [moduleName, setModuleName] = useState('');
    const [enrollmentStatus, setEnrollmentStatus] = useState('');
    const [grade, setGrade] = useState('');
    const [enrollmentDescription, setEnrollmentDescription] = useState('');
    const [showProgressDialog, setShowProgressDialog] = useState(false);
    const [completedModules, setCompletedModules] = useState('');
    const [progressDescription, setProgressDescription] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            if (role === 'user' || !role) {
                navigate(`/${RoutesPaths.NoPermissions}`);
            } else {
                dispatch(getCourses());
            }
        } else {
            navigate(RoutesPaths.Login);
        }
    }, [accessToken, role, navigate, dispatch]);

    useEffect(() => {
        const selectedCourse = coursesData.find(c => c.id === selectedCourseId) ?? coursesData[0];
        setSelectedCourseId(selectedCourse?.id);
        setStudentsData(selectedCourse ? selectedCourse.students : []);
        setSelectedStudent(prev => selectedCourse?.students.find(student => student.id === prev?.id));
    }, [coursesData, selectedCourseId]);

    useEffect(() => {
        if (userActionMode === 'edit') {
            const student = userActionMode === 'edit'
                ? studentsData.find(e => e.id === userToEdit)
                : undefined;

            setLastName(student?.lastName ?? '');
            setFirstName(student?.firstName ?? '');
            setMiddleName(student?.middleName ?? '');
            setBirthDate(student?.birthDate?.slice(0, 10) ?? '');
            setEmail(student?.email ?? '');
            setPhoneNumber(student?.phoneNumber ?? '');
        }
    }, [studentsData, userActionMode, userToEdit]);

    const clearStudentDialogFields = () => {
        setUserActionMode('create');
        setUserToEdit(0);
        setLastName('');
        setFirstName('');
        setMiddleName('');
        setBirthDate('');
        setEmail('');
        setPhoneNumber('');
    }

    const createStudentHandler = () => {
        setUserActionMode('create');
        setShowStudentDialog(true);
    }

    const editStudentHandler = (id: number) => {
        setUserActionMode('edit');
        setUserToEdit(id);
        setShowStudentDialog(true);
    }

    const userDialogContentRenderer = () => {
        return (
            <>
                <TextField labelText="Фамилия" value={lastName} onChange={(val) => setLastName(val)} />
                <TextField labelText="Имя" value={firstName} onChange={(val) => setFirstName(val)} />
                <TextField labelText="Отчество" value={middleName} onChange={(val) => setMiddleName(val)} />

                <TextField type="date" labelText="Дата рождения" value={birthDate} onChange={(val) => setBirthDate(val)} />
                <TextField labelText="Email" value={email} onChange={(val) => setEmail(val)} />
                <TextField labelText="Телефон" value={phoneNumber} onChange={(val) => setPhoneNumber(val)} />
            </>
        );
    }

    const closeStudentDialogHandler = () => {
        setShowStudentDialog(false);
        clearStudentDialogFields();
    }

    const saveStudentDialogHandler = () => {
        if (!selectedCourseId || !birthDate) return;
        const savingStudent = {
            courseId: selectedCourseId, firstName, lastName, middleName, email, phoneNumber,
            birthDate: new Date(`${birthDate}T00:00:00Z`).toISOString()
        };
        if (userActionMode === 'create') {
            dispatch(addStudent(savingStudent));
        } else {
            const student = studentsData.find(s => s.id === userToEdit);
            if (!student) return;
            dispatch(editStudent({ ...savingStudent, id: student.id,
                enrollment: student.enrollment ?? [], studentProgress: student.studentProgress ?? [], userFiles: student.userFiles ?? [] }));
        }
        closeStudentDialogHandler();
    }

    const deleteStudentHandler = (id: number) => {
        if (window.confirm('Вы действительно хотите удалить данного студента и его файлы?')) {
            dispatch(deleteStudent(id));
        }
    }

    const closeCourseDialogHandler = () => {
        setShowCourseDialog(false);
        setCourseName('');
        setCourseDescription('');
        setCourseActionMode('create');
    }

    const saveCourseHandler = () => {
        if (!courseName.trim()) return;
        if (courseActionMode === 'create') {
            dispatch(addCourse({ name: courseName, description: courseDescription }));
        } else if (selectedCourseId) {
            dispatch(editCourse({ id: selectedCourseId, name: courseName, description: courseDescription }));
        }
        closeCourseDialogHandler();
    }

    const courseChangedHandler = (id?: string) => {
        const _id: number | undefined = !id ? undefined : +id;
        setSelectedCourseId(_id);
    }

    const studentSelectedHandler = (id: number) => {
        const student = studentsData.find(s => s.id === id);
        setSelectedStudent(student);
    }

    const getFIO = () => {
        if(!selectedStudent) {
            return '';
        }
        return `${selectedStudent.lastName} ${selectedStudent.firstName} ${selectedStudent.middleName ?? ''}`.trim()
    }

    const fileToBase64 = (file: File, callback: (base64String: string) => void) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                const base64String = reader.result.split(',')[1];
                callback(base64String);
            }
        }
        reader.readAsDataURL(file);
    }

    const uploadFileHandler = () => {
        fileInputRef.current?.click();
    }

    const fileSelectHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const studentId = selectedStudent?.id;
        event.target.value = '';
        if (file && studentId) {
            fileToBase64(file, (base64String: string) => {
                dispatch(uploadFile({ studentId, fileName: file.name, fileString: base64String }));
            });
        }
    }

    const downloadFileHandler = (displayName: string, systemName: string) => {
        FilesApi.downloadFile({ displayName, systemName }).then(data => {
            const link = document.createElement('a');
            const url = window.URL.createObjectURL(data);
            link.href = url;
            link.download = displayName;
            link.click();
            window.URL.revokeObjectURL(url);
        });
    }

    const deleteFileHandler = (id: number) => {
        const file = selectedStudent?.userFiles.find(f => f.id === id);
        if (file && window.confirm('Вы действительно хотите удалить данный файл?')) {
            dispatch(deleteFile(file.systemName));
        }
    }

    const deleteCourseHandler = () => {
        if (!selectedCourseId) {
            return;
        }
        if (!window.confirm('Вы действительно хотите удалить данный курс?')) {
            return;
        }

        dispatch(deleteCourse(selectedCourseId));
    }

    return (
        <Layout>
            <input type="file" onChange={fileSelectHandler} style={{ display: 'none' }} ref={fileInputRef} />
            {role === 'admin' && (
                <Dialog title={courseActionMode === 'edit' ? 'Изменить курс' : 'Добавить курс'} open={showCourseDialog}
                    onSave={saveCourseHandler} onCancel={closeCourseDialogHandler}>
                    <TextField labelText="Наименование" value={courseName} onChange={setCourseName} />
                    <TextField labelText="Описание" value={courseDescription} onChange={setCourseDescription} />
                </Dialog>
            )}
            <Dialog title={userActionMode !== 'edit' ? 'Добавить студента' : 'Изменить студента'}
                open={showStudentDialog}
                onSave={saveStudentDialogHandler}
                onCancel={closeStudentDialogHandler}
            >
                {userDialogContentRenderer()}
            </Dialog>
            <Dialog title="Данные об обучении" open={showEnrollmentDialog}
                onSave={() => {
                    if (selectedStudent) dispatch(addEnrollment({ studentId: selectedStudent.id, moduleName, status: enrollmentStatus, grade, description: enrollmentDescription }));
                    setShowEnrollmentDialog(false); setModuleName(''); setEnrollmentStatus(''); setGrade(''); setEnrollmentDescription('');
                }}
                onCancel={() => { setShowEnrollmentDialog(false); setModuleName(''); setEnrollmentStatus(''); setGrade(''); setEnrollmentDescription(''); }}>
                <TextField labelText="Название модуля" value={moduleName} onChange={setModuleName} />
                <TextField labelText="Статус" value={enrollmentStatus} onChange={setEnrollmentStatus} />
                <TextField labelText="Оценка" value={grade} onChange={setGrade} />
                <TextField labelText="Описание" value={enrollmentDescription} onChange={setEnrollmentDescription} />
            </Dialog>
            <Dialog title="Прогресс" open={showProgressDialog}
                onSave={() => {
                    if (selectedStudent) dispatch(addStudentProgress({ studentId: selectedStudent.id, completedModules: +completedModules, description: progressDescription }));
                    setShowProgressDialog(false); setCompletedModules(''); setProgressDescription('');
                }}
                onCancel={() => { setShowProgressDialog(false); setCompletedModules(''); setProgressDescription(''); }}>
                <TextField type="number" labelText="Количество пройденных модулей" value={completedModules} onChange={setCompletedModules} />
                <TextField labelText="Описание" value={progressDescription} onChange={setProgressDescription} />
            </Dialog>
            <div className="crs-page">
                <div className="crs-page__users-list-container">
                    <div className="crs-page__course-actions">
                        <DropDown items={coursesData.map(cc => {
                            return {
                                text: cc.name,
                                value: cc.id.toString()
                            } as DropDownItem;
                        })}
                            label="Курсы:"
                            value={selectedCourseId?.toString() ?? ''}
                            selectedChanged={(val) => courseChangedHandler(val)}
                        />
                        {role === 'admin' && (<>
                            <PlusIcon width={16} height={16} onClick={() => { setCourseActionMode('create'); setShowCourseDialog(true); }} />
                            <PencilIcon onClick={() => {
                                const course = coursesData.find(c => c.id === selectedCourseId);
                                if (!course) return;
                                setCourseName(course.name); setCourseDescription(course.description ?? '');
                                setCourseActionMode('edit'); setShowCourseDialog(true);
                            }} />
                            <TrashIcon onClick={deleteCourseHandler} />
                        </>)}
                    </div>
                    <StudentsList studentsList={studentsData}
                        onItemClick={(id) => studentSelectedHandler(id)}
                        onItemDelete={deleteStudentHandler}
                        onItemEdit={editStudentHandler}
                    />
                    <Button text="Добавить студента" className='crs-page__add-user-btn' onClick={createStudentHandler} />
                </div>
                <div className="crs-page__user-info-container">
                    <div className="crs-page__user-info-header">
                        <div className="crs-page__user-info-user">
                            <div className="crs-page__user-info-fullname">
                                {getFIO()}
                            </div>
                            <div className="crs-page__user-info-pers-data">
                                <div>
                                    <strong>Дата рождения: </strong>
                                    <span>{
                                        selectedStudent?.birthDate
                                            ? format(new Date(selectedStudent.birthDate), 'dd.MM.yyyy')
                                            : '-'
                                    }</span>
                                </div>
                                <div>
                                    <strong>Email: </strong>
                                    <span>{selectedStudent?.email ?? '-'}</span>
                                </div>
                                <div>
                                    <strong>Телефон: </strong>
                                    <span>{selectedStudent?.phoneNumber ?? '-'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="crs-page__user-info-actions">
                            {selectedStudent && <UploadIcon onClick={uploadFileHandler} color="#7a7a7a" />}
                        </div>
                    </div>
                    <div className="crs-page__user-add-info">
                        <div className="crs-page__user-add-info-files">
                            <span className="crs-page__label">
                                Прикреплённые файлы:
                            </span>
                            <FilesList
                                onFileDownload={downloadFileHandler}
                                onFileDelete={deleteFileHandler}
                                filesList={selectedStudent?.userFiles ?? []}
                            />
                        </div>
                        <div className="crs-page__user-add-info-data">
                            <div className="crs-page__user-add-info-data__cell">
                                <div className="crs-page__list-title">
                                    <span className="crs-page__label">
                                        Данные об обучении:
                                    </span>
                                    {selectedStudent && <PlusIcon width={16} height={16} onClick={() => setShowEnrollmentDialog(true)} />}
                                </div>
                                <EnrollmentsList enrollmentsList={selectedStudent?.enrollment ?? []} onDelete={(id) => {
                                    if (window.confirm('Вы действительно хотите удалить запись об обучении?')) dispatch(deleteEnrollment(id));
                                }} />
                            </div>
                            <div className="crs-page__user-add-info-data__cell">
                                <div className="crs-page__list-title">
                                    <span className="crs-page__label">
                                        Прогресс:
                                    </span>
                                    {selectedStudent && <PlusIcon width={16} height={16} onClick={() => setShowProgressDialog(true)} />}
                                </div>
                                <ProgressList progressList={selectedStudent?.studentProgress ?? []} onDelete={(id) => {
                                    if (window.confirm('Вы действительно хотите удалить запись о прогрессе?')) dispatch(deleteStudentProgress(id));
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
