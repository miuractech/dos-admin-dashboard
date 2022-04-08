import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { undefinedArrayCheck } from '../utils/helpers/validation-custom';

const schema = yup.object({
  arr: yup
    .array()
    .of(yup.string().required().min(3).max(10))
    .test('array_of_strings', 'must be at least one length', (val) => {
      if (val !== undefined) {
        return undefinedArrayCheck(val) && val.length > 0;
      } else {
        return false;
      }
    }),
});

const ListOfElements: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{ arr: Array<string> }>({
    resolver: yupResolver(schema),
  });
  const [val, setVal] = React.useState('');
  const [localArr, setLocalArr] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    setValue('arr', localArr);
  }, [localArr]);

  console.log(errors);

  return (
    <form>
      <input onChange={(e) => setVal(e.target.value)} value={val} />
      <button
        onClick={(e) => {
          e.preventDefault();
          setLocalArr((prev) => [...prev, val]);
          setVal('');
        }}
      >
        Set
      </button>
      <button onClick={handleSubmit((data) => console.log(data))}>
        Submit
      </button>
    </form>
  );
};

export default ListOfElements;
