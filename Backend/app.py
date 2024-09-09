from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from sqlalchemy import func


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@localhost/md'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100))
    manufacturing_date = db.Column(db.Date)
    expiry_date = db.Column(db.Date)
    price = db.Column(db.Float)
    quantity = db.Column(db.Integer)
    
    def __init__(self, product_name, manufacturing_date, expiry_date, price, quantity):
    
 
        self.product_name = product_name
        self.manufacturing_date = manufacturing_date
        self.expiry_date = expiry_date
        self.price = price
        self.quantity = quantity


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'product_name', 'manufacturing_date', 'expiry_date', 'price', 'quantity')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route('/get', methods=['GET'])
def get_articles():
    all_articles = Articles.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)


@app.route('/get/<id>/', methods=['GET'])
def post_details(id):
    article = Articles.query.get(id)
    return article_schema.jsonify(article)


@app.route('/add', methods=['POST'])
def add_article():
    product_name = request.json.get('product_name')
    manufacturing_date = datetime.datetime.strptime(request.json.get('manufacturing_date'), '%Y-%m-%d')
    expiry_date = datetime.datetime.strptime(request.json.get('expiry_date'), '%Y-%m-%d')
    price = float(request.json.get('price'))
    quantity = int(request.json.get('quantity'))

    articles = Articles( product_name, manufacturing_date, expiry_date, price, quantity)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)


@app.route('/update/<id>/', methods=['PUT'])
def update_article(id):
    article = Articles.query.get(id)
    product_name = request.json['product_name']
    manufacturing_date = datetime.datetime.strptime(request.json['manufacturing_date'], '%Y-%m-%d')
    expiry_date = datetime.datetime.strptime(request.json['expiry_date'], '%Y-%m-%d')
    price = float(request.json['price'])
    quantity = int(request.json['quantity'])

   
    article.product_name = product_name
    article.manufacturing_date = manufacturing_date
    article.expiry_date = expiry_date
    article.price = price
    article.quantity = quantity

    db.session.commit()
    return article_schema.jsonify(article)


@app.route('/delete/<id>/', methods=['DELETE'])
def article_delete(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()

    return article_schema.jsonify(article)

@app.route('/total_value', methods=['GET'])
def get_total_value():
    total_value = db.session.query(func.sum(Articles.quantity * Articles.price)).scalar()
    return jsonify({'total_value': total_value})


if __name__ == "__main__":
    app.run(debug=True)