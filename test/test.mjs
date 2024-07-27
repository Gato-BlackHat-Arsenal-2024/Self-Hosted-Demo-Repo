import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../index.js'; // Adjust the path if necessary
import http from 'http';
const { expect } = chai;

chai.use(chaiHttp);

let server;

before((done) => {
  server = http.createServer(app);
  server.listen(3001, done); // Use a different port for the test server
});

after((done) => {
  if (server && server.listening) {
    server.close((err) => {
      if (err) return done(err);
      done();
      process.exit(0); // Explicitly exit the process
    }); // Close the server after tests
  } else {
    done();
    process.exit(0); // Explicitly exit the process
  }
});

describe('GET /', () => {
  it('should return Hello World', (done) => {
    chai.request(server) // Use the server instance instead of app
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Hello World');
        done();
      });
  });
});