import { connect } from 'mongoose';

export default class MongoConnect {
  static count = 0
  constructor(uri) {
    this.uri = uri;
    MongoConnect.count++;
    if (typeof MongoConnect.instance === 'object') {
      return MongoConnect.instance;
    } else {
      MongoConnect.instance = this;
      return this;
    }
  }
  async connectMongo() {
    connect(this.uri)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.log(err));
  }
  single() {
    if (MongoConnect.count > 1) {
      console.log('Mongo instance already created');
    } else {
      console.log('First mongo instance created');
    }
  }
}
