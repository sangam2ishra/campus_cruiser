import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.username || !formData.email || !formData.password || !formData.role) {
      return setErrorMessage('Please fill out all fields.');
    }
    if (!formData.email.endsWith("@iitbbs.ac.in")) {
      return setErrorMessage('Please fill out Valid Institue Email Id .');
    }

    // Ask for the secret key for admin role
    if (formData.role === 'Admin') {
      const { value: secretKey } = await MySwal.fire({
        title: 'Enter Secret Key',
        input: 'password',
        inputPlaceholder: 'Enter your secret key',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
      });

      if (secretKey !== '1275') { // Replace 'YOUR_SECRET_KEY' with the actual secret key
        MySwal.fire({
          icon: "error",
          title: "Wrong Secret Key",
          text: "Please Enter the Correct Secret Key!",
        });
        return;
      }
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r  from-blue-700 via-white to-blue-800 rounded-lg text-black font-bold ">
              Campus Cruisers
            </span>
            &nbsp; <br />
            <br /> IIT Bhubaneswar
          </Link>
          <p className="text-sm mt-5">
            This is a College Services. You can sign in with your email and
            password or with Google.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Institue Email id" />
              <TextInput
                type='email'
                placeholder="22cs01**@iitbbs.ac.in"
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <div className="mb-[-10px]">
              <p className="font-bold" > Sign as .</p>
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="role"
                  type="radio"
                  name="role"
                  value="Student"
                  onChange={handleChange}
                  defaultValue
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />

                <label
                  htmlFor="student"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Student
                </label>

                <input
                  id="role"
                  type="radio"
                  name="role"
                  value="Faculty"
                  onChange={handleChange}
                  defaultValue
                  className="ml-3 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
                <label
                  htmlFor="faculty"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Faculty</label>
                <input
                  id="role"
                  type="radio"
                  name="role"
                  value="Admin"
                  onChange={handleChange}
                  defaultValue
                  className="ml-3 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
                <label
                  htmlFor="admin"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Admin</label>
              </div>
            </div>

            <Button
              gradientDuoTone='purpleToBlue'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
