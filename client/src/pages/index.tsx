import React, {useEffect} from "react";
import {
    BrowserRouter as Router
} from "react-router-dom";
import AppRoutes from "../routes";
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

const App = () => {
    useEffect(() => {
        document.title = 'Welcome | Absence Manager';
    });

    return (
        <Router>
            <>
                <QueryClientProvider client={queryClient}>
                    {/*<Header/>*/}
                    <main className="mt-5 min-h-screen pt-10 flex-1">
                        <AppRoutes/>
                    </main>
                    {/*<Footer />*/}
                </QueryClientProvider>
            </>


        </Router>
    )
}

export default App;