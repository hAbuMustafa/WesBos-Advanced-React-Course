import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);
  // The initialValues workaround is to detect when the fetched data on the UpdateProduct page is loaded so to keep the form uptodate with the state (i.e. not blank initially)
  const initialValues = Object.values(initial).join('');
  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type, files } = e.target;
    if (type === 'number') value = parseInt(value);
    if (type === 'file') [value] = files;

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankInputs = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankInputs);
  }

  return { inputs, handleChange, resetForm, clearForm };
}
