import PageContainer from "../styles/PageContainer";
import Absences from "../Absences";

export default function Home() {
    return (
        <PageContainer>
            <h1 className="text-3xl font-bold underline">
                Absence Manager
            </h1>

            <div className="mt-3">
                <Absences />
            </div>
        </PageContainer>
    )
}