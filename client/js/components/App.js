import React from 'react';
import Logo from '../containers/logo';
import CommandList from '../containers/command-list';
import CommandDetails from '../containers/command-detail';
require('../../scss/style.scss');

const App = () => (
    <div className="container">

        <nav className="navbar navbar-default navbar-fixed-top" style={{color: 'white'}}>
            <div className="container ">
                <div className="navbar-header">
                    <Logo />
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true" aria-expanded="false">Menu <span className="caret"></span></a>
                            <CommandList />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div className="main">
            <CommandDetails />
        </div>
    </div>
);

export default App;
