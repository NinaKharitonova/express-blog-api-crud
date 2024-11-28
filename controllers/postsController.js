// Controller per i Post
const posts = require("../data/arrayPosts");

// Index
const index = (req, res) => {
  const { tag } = req.query;

  // Filtra i post per tag, se fornito
  const filteredPosts = tag
    ? posts.filter((post) => post.tags.includes(tag))
    : posts;

  res.json({
    message: "Lista dei post",
    count: filteredPosts.length,
    posts: filteredPosts,
  });
};

// Show
const show = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: `Post con ID ${id} non trovato` });
  }

  res.json(post);
};

// Create
const create = (req, res) => {
  res.send("Creazione di un nuovo post");
};

module.exports = {
  store: (req, res) => {
    module.exports = {
      store: (req, res) => {
        const { title, content, image, tags } = req.body;

        const newPost = {
          title,
          content,
          image,
          tags,
        };
        posts.push(newPost);

        console.log(posts);

        res
          .status(201)
          .json({ message: "Post aggiunto con successo!", data: newPost });
      },
    };
  },
};

// Update
const update = (req, res) => {
  const id = req.params.id;
  res.send(`Aggiornamento del post ${id}`);
};

module.exports = {
  update: (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content, image, tags } = req.body;

    const post = posts.find((p) => p.id === postId);

    if (!post) {
      return res.status(404).json({ message: "Post non trovato!" });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (image) post.image = image;
    if (tags) post.tags = tags;

    console.log(posts);

    res
      .status(200)
      .json({ message: "Post aggiornato con successo!", data: post });
  },
};

// Destroy
const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Post con ID ${id} non trovato` });
  }

  posts.splice(index, 1);

  console.log("Lista aggiornata:", posts);
  res.status(204).send(); // Nessun contenuto
};

module.exports = { index, show, create, update, destroy };
