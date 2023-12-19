//importar el modelo
const Portfolio = require("../models/Portafolio.js");

//Importar el metodo
const { uploadImage } = require("../config/cloudinary");

//Metodo para listar los portafolios
const renderAllPortafolios = async (req, res) => {
  //Listar todos los portafolios
  const portfolios = await Portfolio.find({ user: req.user._id }).lean();
  //
  res.render("portafolio/allPortfolios", { portfolios });
};
//Metodo para listar el detale de un portafolio
const renderPortafolio = (req, res) => {
  res.send("Mostrar el detalle de un portafolio");
};
//Metodo para mostrar el formulario
const renderPortafolioForm = (req, res) => {
  res.render("portafolio/newFormPortafolio");
};
//Metodo para guardar en la base de datos
const createNewPortafolio = async (req, res) => {
  const { title, category, description } = req.body;
  const newPortfolio = new Portfolio({ title, category, description });
  //Asociar el portafolio con el usuario
  newPortfolio.user = req.user._id;
  //Guardar en la base de datos
  if (!req.files?.image) return res.send("Se requiere una imagen");
  try {
    await uploadImage(req.files.image.tempFilePath);
  } catch (error) {
    console.log(error);
  }
  //Utilizar el metodo
  await uploadImage(req.files.image.tempFilePath);
  await newPortfolio.save();
  res.redirect("/portafolios");
};
//Metodo para actualizar el portafolios
const renderEditPortafolioForm = async (req, res) => {
  //Consulta del portafolio en BDD con el ID
  const portfolio = await Portfolio.findById(req.params.id).lean();
  //Mandar a la vista
  res.render("portafolio/editPortfolio", { portfolio });
};
//Metodo para actualizar en la BD
const updatePortafolio = async (req, res) => {
  //Capturar los datos del body
  const { title, category, description } = req.body;
  //Actualizar el portafolio en la base de datos
  await Portfolio.findByIdAndUpdate(req.params.id, {
    title,
    category,
    description,
  });
  //Redireccionar
  res.redirect("/portafolios");
};
//Metodo para eliminar los portafolios
const deletePortafolio = async (req, res) => {
  //Capturar el id del producto
  await Portfolio.findByIdAndDelete(req.params.id);
  res.redirect("/portafolios");
};

module.exports = {
  renderAllPortafolios,
  renderPortafolio,
  renderPortafolioForm,
  createNewPortafolio,
  renderEditPortafolioForm,
  updatePortafolio,
  deletePortafolio,
};
