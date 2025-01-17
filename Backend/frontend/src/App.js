import './App.css';
import { useState, useEffect } from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';

function App() {

    const [articles, setArticles] = useState([]);
    const [editedArticle, setEditedArticle] = useState(null);
    const [totalValue, setTotalValue] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/get', {
            'method': 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setArticles(resp))
            .catch(error => console.log(error));
    }, []);

    const editArticle = (article) => {
        setEditedArticle(article);
    }

    const updatedData = (article) => {
        const new_article = articles.map(my_article => {
            if (my_article.id === article.id) {
                return article;
            } else {
                return my_article;
            }
        });
        setArticles(new_article);
    }

    const openForm = () => {
        setEditedArticle({ title: '', body: '' });
    }

    const insertedArticle = (article) => {
        const new_articles = [...articles, article];
        setArticles(new_articles);
    }

    const deleteArticle = (article) => {
        const new_articles = articles.filter(myarticle => {
            if (myarticle.id === article.id) {
                return false;
            }
            return true;
        });
        setArticles(new_articles);
    }

    const handleTotalClick = () => {
        fetch('http://127.0.0.1:5000/total_value', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => setTotalValue(data.total_value))
            .catch(error => console.error('Error:', error));
    }
    const handlePrint = () => {
        window.print();
    };
    return (
        <div className="App">
            <div className='row'>
                <div className='col'>
                    <h1>E-billing System</h1>
                </div>
                <div className='col'>
                    <button className='btn btn-success' onClick={openForm}>Add</button>
                </div>
                <div className='col'>
                    <button className='btn btn-success' onClick={handleTotalClick}>Total</button>
                </div>
                
            </div>

            <ArticleList articles={articles} editArticle={editArticle} deleteArticle={deleteArticle} />
            {totalValue && <p>Total Amout: {totalValue}</p>}
            <div className='col'>
                    <button className='btn btn-success' onClick={handlePrint}>Print</button>
                </div>
            {editedArticle ? <Form article={editedArticle} updatedData={updatedData} insertedArticle={insertedArticle} /> : null}
        </div>
    );
}

export default App;
