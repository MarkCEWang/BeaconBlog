import Post from '../models/post';
import Login from '../models/login';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';

export function checkin(req, res) { // check whether the user exits

  const user = req.body.loginfo.username;
  const pw = req.body.loginfo.password;

  if(!user || !pw) {
    return res.status(403).end();
  }

  Login.findOne({ username: user }).exec((err, result) => {

    if(err) {
      return res.status(500).send(err);
    }

    var username;
    var password;
    if(!result) { username = "no such user"; password = "no such user"; }
    else if(pw != result.password) { username = "wrong password"; password = "wrong password"; }
    else { username = result.username; password = result.password; }

    var loginfo = { username: username, password: password };
    res.json({ loginfo });

  });

}


export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ posts });
  });
}

export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    return res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ post: saved });
  });
}

export function getPost(req, res) {
  const newSlug = req.query.slug.split('-');
  const newCuid = newSlug[newSlug.length - 1];
  Post.findOne({ title: newCuid }).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ post });
  });
}

export function deletePost(req, res) {
  const postId = req.body.postId;
  Post.findById(postId).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
