import React from 'react'

function NewUserPage() {
  return (
    <form >
      <label>
        Name:
        <input type="text" name="name"  />
      </label>
      <label>
        Email:
        <input type="email" name="email"  />
      </label>
      <label>
        Message:
        <textarea name="message" />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default NewUserPage