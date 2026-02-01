const { StatusCodes } = require('http-status-codes');
const Job = require('../models/Job');
const { BadRequestError, NotFoundError } = require('../errors');


const getAllJobs = async (req, res) => {
  res.send("Get All jobs");
};
const getSingleJob = async (req, res) => {
  res.send("Get a job");
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json(job)
};
const updateJob = async (req, res) => {
  res.send("update jobs");
};
const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
