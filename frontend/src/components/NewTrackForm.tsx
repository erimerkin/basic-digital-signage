import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { PlaylistTrack } from './Playlist';
import validator from 'validator';

interface FormError {
  name: string;
  type: string;
  url: string;
  duration: string;
}

interface FormProps {
  onSubmit: (values: PlaylistTrack) => void;
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

interface RequestStatus {
  error: boolean;
  message: string;
}

export const NewTrackForm: React.FC<FormProps> = ({ onSubmit, hidden, setHidden }) => {

  const [values, setValues] = useState<PlaylistTrack>({
    name: '',
    type: 'video',
    url: '',
    duration: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FormError>({
    name: '',
    type: '',
    url: '',
    duration: '',
  });
  const [requestStatus, setRequestStatus] = useState<RequestStatus>({
    error: false,
    message: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    // Reset the error object
    const newError: FormError = {
      name: '',
      type: '',
      url: '',
      duration: '',
    };

    // Validate the form data
    if (!values.name || values.name.length === 0) {
      newError.name = 'Track name is required';
    }

    if (!values.type) {
      newError.type = 'Track type is required';
    }

    if (!values.url) {
      newError.url = 'Track URL is required';
    } else if (!validator.isURL(values.url)) {
      newError.url = 'Track URL is not valid';
    }

    if (!values.duration) {
      newError.duration = 'Track duration is required';
    } else if (values.duration <= 0) {
      newError.duration = 'Track duration must be greater than 0';
    }

    if (!newError.name && !newError.type && !newError.url && !newError.duration) {
      // Submit the form data to the API
      await sendRequest();
    }

    // Reset the form
    setValues({
      name: '',
      type: 'video',
      url: '',
      duration: 0,
    });

    setError(newError);
  }

  async function sendRequest(): Promise<void> {
    setLoading(true);

    const data: PlaylistTrack = {
      name: values.name,
      type: values.type,
      url: values.url,
      duration: Number(values.duration),
    };

    const apiUrl: string = "http://localhost:1955/api/add";

    await axios.post(apiUrl, data).then((response: AxiosResponse) => {
      if (response.status === 200) {
        onSubmit(data);
        setRequestStatus({
          error: false,
          message: 'Track added successfully',
        });
      }
    }).catch((error) => {


      if (error.response!.status === 400) {
        setRequestStatus({
          error: true,
          message: error.response.data.message as string,
        });
      }
      else {
        setRequestStatus({
          error: true,
          message: 'An error occurred while adding the track',
        });
      }
    });


    setLoading(false);
  }

  return (
    <div className="container" >
      {!hidden ?
        <form className="playlist-track-form" onSubmit={handleSubmit}>
          <div className='row'>
            <h2>Add new media</h2>
            <div className="spacer" />
            <button className="close-button" onClick={() => {
              setHidden(true);
            }}>X</button>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Track name"
            value={values.name}
            onChange={handleInputChange}
          />
          <span className="error">{error.name}</span>

          <select name="type" value={values.type} onChange={handleSelectChange}>
            <option value="video">Video</option>
            <option value="image">Image</option>
          </select>
          <span className="error">{error.type}</span>

          <input
            type="text"
            name="url"
            placeholder="Track URL"
            value={values.url}
            onChange={handleInputChange}
          />
          <span className="error">{error.url}</span>
          <input
            type="number"
            name="duration"
            placeholder="Track duration (in seconds)"
            value={values.duration}
            onChange={handleInputChange}
          />
          <span className="error">{error.duration}</span>

          <button type="submit" className="submit-button" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
          <span className={requestStatus.error ? "error" : "success"}>{requestStatus.message}</span>
        </form>
        : null}
    </div>
  );
};

export default NewTrackForm;
