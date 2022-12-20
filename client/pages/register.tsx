import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { apiNextURl } from '../api'

export default function Register() {
  const router = useRouter();
  const [state, setState] = useState<any>({
    email: '',
    password: '',
    name: '',
    isSubmitting: false,
    message: '',
    errors: null,
  })

  const { email, password, name, message, isSubmitting, errors } = state

  const handleChange = async (e: any) => {
    await setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setState({ ...state, isSubmitting: true })

    const { email, password, name } = state
    try {
      const res = await fetch(`${apiNextURl}/register`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      }).then(res => res.json())
      const { success, msg, errors } = res

      if (!success) {
        return setState({ ...state, message: msg, errors, isSubmitting: false })
      }

      router.push('/login')
    } catch (e: any) {
      setState({ ...state, message: e.toString(), isSubmitting: false })
    }
  }

  return (
    <div className="wrapper">
      <h1>Register</h1>
      <input
        className="input"
        type="name"
        placeholder="Name"
        value={name}
        name="name"
        onChange={e => {
          handleChange(e)
        }}
      />
      <input
        className="input"
        type="text"
        placeholder="Email"
        value={email}
        name="email"
        onChange={e => {
          handleChange(e)
        }}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        name="password"
        onChange={e => {
          handleChange(e)
        }}
      />

      <button disabled={isSubmitting} onClick={() => handleSubmit()}>
        {isSubmitting ? '.....' : 'Sign Up'}
      </button>
      <div className="message">{message && <p>&bull; {message}</p>}</div>
      <div>
        {errors &&
          errors.map((error: any, id: string) => {
            return <p key={id}> &bull; {error}</p>
          })}
      </div>
    </div>
  )
}
