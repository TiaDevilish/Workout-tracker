const mongoose = require("mongoose");

const Schema = mongoose.Schema

const workoutSchema = new Schema(
    {
        day:{
            type: Date,
            default: Date.now
        },
        exercises:[
            {
                type:{
                    type: String,
                    trim: true,
                    required: "Enter an exercise type"
                },
                name:{
                    type: String,
                    trim: true,
                    required: "Enter an exercise name"
                },
                duration:{
                    type: Number,
                    required: "Enter duration of the exercise in minutes"
                },
                weight:{
                    type: Number
                },
                reps:{
                    type: Number
                },
                sets:{
                    type: Number
                },
                distance:{
                    type: Number
                }
            }
        ]
    },
    {
        toJSON:{
            virtuals: true
        }
    }
);

workoutSchema.virtual("totalDuration").get(function(){
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    },0);
});

workoutSchema.virtual("totalWeight").get(function() {
    return this.exercises.reduce((total, exercise) => {
      return total + exercise.weight;
    }, 0);
  });
  
  workoutSchema.virtual("totalSets").get(function() {
    return this.exercises.reduce((total, exercise) => {
      return total + exercise.sets;
    }, 0);
  });
  
  
  workoutSchema.virtual("totalReps").get(function() {
    return this.exercises.reduce((total, exercise) => {
      return total + exercise.reps;
    }, 0);
  });
  
  workoutSchema.virtual("totalDistance").get(function() {
    return this.exercises.reduce((total, exercise) => {
      return total + exercise.distance;
    }, 0);
  });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;