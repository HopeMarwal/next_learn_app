
import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";

//GET 
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    //get prompt by id
    const prompt = await Prompt.findById(params.id).populate('creator')

    //check if prompt exists
    if(!prompt) {
      return new Response('Prompt not found', { status: 404 })
    }

    return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 })
  }
}

//PATCH (update)
export const PATCH = async ( req, { params }) => {
  const { prompt, tag, img } = await req.json();

  try {
    await connectToDB();
    //get prompt by id
    const existingPrompt = await Prompt.findById(params.id)

    if(!existingPrompt) {
      return new Response('Prompt not found', { status: 404 })
    }

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag
    existingPrompt.img = img

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (error) {
    return new Response('Failed to update the prompt', { status: 500 })
  }
}

//DELETE (delete)
export const DELETE = async ( req, { params }) => {
  try {
    await connectToDB();
    //get prompt by id
    await Prompt.findByIdAndRemove(params.id)

    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Failed to delete the prompt', { status: 500 })
  }
}