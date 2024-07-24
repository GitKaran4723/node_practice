const News = require('../models/News');

exports.getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createNews = async (req, res) => {
  const news = new News(req.body);
  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getNewsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    console.log(date);
    const newsDate = new Date(date); // Parse the date from query string

    // Find news items for the given date
    const news = await News.find({
      date_update: {
        $gte: new Date(newsDate.setUTCHours(0, 0, 0, 0)),
        $lt: new Date(newsDate.setUTCHours(23, 59, 59, 999))
      }
    });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

