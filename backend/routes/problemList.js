const express = require("express");
const router = express.Router();
const {
    AddProblem,
    getProblems ,
    editProblem,
    deleteProblem 
} = require("../controllers/problemListController");

router.post("/add-problem", AddProblem);
router.get("/get-problem", getProblems);
router.put("/edit-problem/:id", editProblem )
router.delete("/delete-problem/:id", deleteProblem )

module.exports = router;
