import React, {useEffect} from "react";
import {
    BrowserRouter as Router
} from "react-router-dom";
import AppRoutes from "../routes";

const App = () => {
    useEffect(() => {
        document.title = 'Welcome | Absence Manager';
    });

    return (
        <Router>
            <>
                {/*<Header/>*/}
                <main className="mt-5 min-h-screen pt-10 flex-1">
                    <AppRoutes/>
                </main>
                {/*<Footer />*/}
            </>


        </Router>
    )
}

export default App;