import Link from 'next/link';
import React from 'react'

async function TopicList() {
    
  const getTopics = async () => {
    try {
    const res = await fetch('http://localhost:3000/api/topics', {
        cache: "no-cache",
        next: {
        tags: ["topics"],
        },
    });

    return await res.json();
    } catch (error) {
    console.log("Error", error);
    }
  };

  const topics = await getTopics();

  return (
  <div>
    <table className="min-w-full text-left text-sm font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr>
          <th scope="col" className="px-6 py-4">#</th>
          <th scope="col" className="px-6 py-4">Title</th>
          <th scope="col" className="px-6 py-4">Description</th>
          <th scope="col" className="px-6 py-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {topics?.data ? (
          topics?.data?.map((currElem: any) => (
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{currElem?._id}</td>
              <td className="whitespace-nowrap px-6 py-4"> {currElem?.title}</td>
              <td className="whitespace-nowrap px-6 py-4"> {currElem?.description}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <Link
                  href={`/UpdateTopic/${currElem?._id}`}
                  className="text-md text-white bg-indigo-600 px-4 py-1"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <div>Loading..</div>
        )}
      </tbody>
      </table>
  </div>
  )
}

export default TopicList