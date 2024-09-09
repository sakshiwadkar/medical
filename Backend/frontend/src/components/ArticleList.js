import React from 'react';
import APIService from '../components/APIService';

function ArticleList(props) {
    const editArticle = (article) => {
        props.editArticle(article);
    };

    const deleteArticle = (article) => {
        APIService.DeleteArticle(article.id)
            .then(() => props.deleteArticle(article));
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Manufacturing Date</th>
                        <th scope="col">Expiry Date</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.articles && props.articles.map(article => (
                        <tr key={article.id}>
                            <td>{article.product_name}</td>
                            <td>{article.manufacturing_date}</td>
                            <td>{article.expiry_date}</td>
                            <td>{article.price}</td>
                            <td>{article.quantity}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Article Actions">
                                    <button className="btn btn-primary" onClick={() => editArticle(article)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteArticle(article)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ArticleList;
