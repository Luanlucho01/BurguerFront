import React from "react"

const Crud: React.FC = () => {

    return (
        <>
            <html>
            <body className="container py-5">
            <h1 className="mb-4">Gerenciar Usuários</h1>

            <form id="user-form" className="mb-4">
                <input type="hidden" id="editIndex"/>
                <div className="mb-3">
                <label className="form-label">Nome</label>
                <input type="text" id="nome" className="form-control" required/>
                </div>
                <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" id="email" className="form-control" required/>
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
                <button type="button" id="cancelar" className="btn btn-secondary d-none">Cancelar</button>
            </form>

            <table className="table table-bordered" id="user-table">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
            </body>
        </html>

        
        </>
    );
};
    
export default Crud;