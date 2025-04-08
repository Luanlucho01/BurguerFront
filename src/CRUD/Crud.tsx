import { useAuth } from "../Autenticação/AuthContext";
import Header from "../components/Headers";
import './Crud.css'; 

const Crud: React.FC= () => {
    const { setToken } = useAuth();


    return (
        <>
        <Header scrolling={true}/>
        <div className="background">
            <a>Crud</a>
        </div>
        </>
    )
}
export default Crud;