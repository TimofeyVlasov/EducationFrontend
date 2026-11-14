import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/layouts';
import './coursesPageStyles.scss'
import { Button, Dialog, DropDown, StudentsList, TextField } from '../../components';
import { Course, Student } from '../../types/models';
import { DropDownItem } from '../../components/dropDown/DropDownProps';

const fakeStudentsData = [
    {
        id: 1, lastName: 'Смирнова', firstName: 'Анна', middleName: 'Андреевна',
        birthDate: new Date().toISOString(), email: 'smirnova@mail.ru', phoneNumber: '8-800-535-35-35',
        enrollments: [
            { id: 1, moduleName: 'Основы программирования', status: 'Завершено', grade: '5' },
            { id: 2, moduleName: 'Базы данных', status: 'В процессе', grade: '-' }
        ],
        progress: [{ id: 1, completedModules: 1, description: 'Успешно сдан первый модуль' }]
    },
    {
        id: 2, lastName: 'Кузнецов', firstName: 'Дмитрий', middleName: 'Сергеевич',
        birthDate: new Date().toISOString(), email: 'kuznetsov@mail.ru', phoneNumber: '8-800-535-35-36',
        enrollments: [{ id: 3, moduleName: 'Веб-разработка', status: 'В процессе', grade: '-' }],
        progress: []
    },
    {
        id: 3, lastName: 'Ли', firstName: 'Мин',
        birthDate: new Date().toISOString(), email: 'li@mail.ru', phoneNumber: '8-800-535-35-37',
        enrollments: [],
        progress: []
    },
    {
        id: 4, lastName: 'Орлова', firstName: 'Екатерина', middleName: 'Павловна',
        birthDate: new Date().toISOString(), email: 'orlova@mail.ru', phoneNumber: '8-800-535-35-38',
        enrollments: [{ id: 4, moduleName: 'Алгоритмы', status: 'Завершено', grade: '4' }],
        progress: [{ id: 2, completedModules: 1 }]
    },
    {
        id: 5, lastName: 'Волков', firstName: 'Артём', middleName: 'Игоревич',
        birthDate: new Date().toISOString(), email: 'volkov@mail.ru', phoneNumber: '8-800-535-35-39',
        enrollments: [],
        progress: []
    }
] as Array<Student>;

const fakeCoursesData = [
    { id: 1, name: 'Курс 1', students: [] },
    { id: 2, name: 'Курс 2', students: fakeStudentsData },
    { id: 3, name: 'Курс 3', students: [] }
] as Array<Course>;

export const CoursesPage: FC = () => {
    const [coursesData, setCoursesData] = useState<Array<Course>>([]);
    const [studentsData, setStudentsData] = useState<Array<Student>>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number>();
    const [selectedStudentId, setSelectedStudentId] = useState<number>();
    const [showStudentDialog, setShowStudentDialog] = useState(false);
    const [userActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [userToEdit, setUserToEdit] = useState(0);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setCoursesData(fakeCoursesData);
            if (Array.isArray(fakeCoursesData) && fakeCoursesData.length) {
                setSelectedCourseId(fakeCoursesData[0].id);
            }
        }, 500);
    }, []);

    useEffect(() => {
        const selectedCourse = coursesData.find(c => c.id === selectedCourseId);
        setStudentsData(selectedCourse ? selectedCourse.students : []);
        setSelectedStudentId(undefined);
    }, [coursesData, selectedCourseId]);

    useEffect(() => {
        clearStudentDialogFields();
        if (userActionMode === 'edit') {
            const student = userActionMode === 'edit'
                ? studentsData.find(e => e.id === userToEdit)
                : undefined;

            setLastName(student?.lastName ?? '');
            setFirstName(student?.firstName ?? '');
            setMiddleName(student?.middleName ?? '');
        }
    }, [studentsData, userActionMode, userToEdit]);

    const clearStudentDialogFields = () => {
        setLastName('');
        setFirstName('');
        setMiddleName('');
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
            </>
        );
    }

    const closeStudentDialogHandler = () => {
        setShowStudentDialog(false);
        clearStudentDialogFields();
    }

    const courseChangedHandler = (id?: string) => {
        const _id: number | undefined = !id ? undefined : +id;
        setSelectedCourseId(_id);
    }

    const studentSelectedHandler = (id: number) => {
        setSelectedStudentId(id);
    }

    return (
        <Layout>
            <Dialog title={userActionMode !== 'edit' ? 'Добавить студента' : 'Изменить студента'}
                open={showStudentDialog}
                onSave={() => {}}
                onCancel={closeStudentDialogHandler}
            >
                {userDialogContentRenderer()}
            </Dialog>
            <div className="crs-page">
                <div className="crs-page__users-list-container">
                    <DropDown items={coursesData.map(cc => {
                        return {
                            text: cc.name,
                            value: cc.id.toString()
                        } as DropDownItem;
                    })}
                        label="Курсы:"
                        selectedChanged={(val) => courseChangedHandler(val)}
                    />
                    <StudentsList studentsList={studentsData}
                        onItemClick={(id) => studentSelectedHandler(id)}
                        onItemDelete={(id) => console.log('delete', id)}
                        onItemEdit={editStudentHandler}
                    />
                    <Button text="Добавить студента" className='crs-page__add-user-btn' onClick={createStudentHandler} />
                </div>
                <div>
                    <div>
                        <span>ФИО</span>
                        <div>*</div>
                    </div>
                    <div>
                        <div>Личные данные</div>
                        <div>Данные об обучении</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
