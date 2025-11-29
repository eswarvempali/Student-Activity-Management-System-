import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import StudentList from '../pages/Students/StudentList';
import StudentDetail from '../pages/Students/StudentDetail';
import StudentForm from '../pages/Students/StudentForm';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/students" exact component={StudentList} />
                <Route path="/students/:id" component={StudentDetail} />
                <Route path="/students/form" component={StudentForm} />
            </Switch>
        </Router>
    );
};

export default Routes;