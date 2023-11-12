'use server' // Server Actions
import connectMongoDB from "@/libs/mongodb"
import Topic from "@/models/topic";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

// Update topic in databse

export const UpdateTopics = async (id, data) => {
    try {
        await connectMongoDB();
        await Topic.findByIdAndUpdate(id, data)
        return { status: "OK", message: "Topic Updated Successfully!" }
    } catch (error) {
        return { status: "ERROR", message: "Server error, please try again!" }
    }
}

// Delete topic from database

export const DeleteTopicsFromDB = async (id) => {
    try {
        await connectMongoDB();
        await Topic.findByIdAndDelete(id)
        revalidateTag("topics")
        return { status: "OK", message: "Topic Deleted Successfully!" }
    } catch (error) {
        return { status: "ERROR", message: "Server error, please try again!" }
    }
}

// Add new topic to database

const AddTopics = async (data) => {
    try {
        const res = await fetch("http://localhost:3000/api/topics", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return await res.json();
    } catch (error) {
        console.log("Error", error);
    }
};

// Add Topic handler..

export const addTopicHandler = async (formData) => {

    let title = formData.get("title");
    let description = formData.get("description");

    if (!title && !description) return;

    const response = await AddTopics({ title, description });
    if (response.status === "OK"){
        redirect('/')
    }
    revalidateTag("topics")
};