import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    //one user can create many prompts (one to many rel)
    ref: 'User'
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required']
  },
  tag: {
    type: String,
    required: [true, 'Tag is required']
  },
  img: {
    type: String
  }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt;