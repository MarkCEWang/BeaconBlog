import Login from './models/login';

export default function () {
  Login.count().exec( (err, count) => {

    if (count > 0) {
      return;
    }

    const address = "good@gmail.com";
    const name = "good";
    const key = "good";

    const user = new Login({ email: address, username: name, password: key });

    Login.create(user, (error) => {
      if (!error) {

      }
    });

  });
}
