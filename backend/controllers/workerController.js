import * as service from "../services/workerService.js";

export async function getWorkers(req, res) {
  try {
    const workers = await service.getWorkers();

    res.json(workers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getWorkerById(req, res) {
  res.json({});
}

export async function createWorker(req, res) {
  try {
    const worker = await service.createWorker(req.body);

    res.status(201).json(worker);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create worker",
    });
  }
}

export async function updateWorker(req, res) {
  res.json({});
}

export async function deleteWorker(req, res) {
  res.json({});
}

export async function createPassport(req, res) {
  try {
    const passport = await service.createPassport(req.params.id, req.body);

    res.status(201).json(passport);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create passport",
    });
  }
}
