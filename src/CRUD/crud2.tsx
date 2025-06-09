import React from "react";
import './Crud.css';
import Header from '../components/Headers';

const Crud: React.FC = () => {

    return (
        <>
            <Header scrolling={true} />

            <main>
                <div className="crud-container">
                <h2>Área de Gerenciamento</h2>

                
                <div className="crud-actions">
                    <button className="crud-btn">Adicionar</button>
                    <button className="crud-btn">Editar</button>
                    <button className="crud-btn">Excluir</button>
                </div>
                </div>
            </main>
            
        </>
    );
};
    
export default Crud;