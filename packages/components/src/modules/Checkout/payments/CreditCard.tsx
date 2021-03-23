import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Button, Input } from 'theme-ui';
import * as yup from 'yup';

import type { CreditCard as CreditCardType } from 'types/Checkout';

import Form from '../../Form/Form';

const schema: yup.SchemaOf<CreditCardType> = yup.object().shape({
  name: yup.string().required(),
});

const CreditCard = ({
  onSubmit,
}: {
  onSubmit: (data: CreditCardType) => void;
}) => {
  const { handleSubmit, register } = useForm<CreditCardType>({
    resolver: yupResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Form.Item>
        <Input name="name" ref={register} />
      </Form.Item>
      <Button>
        <FormattedMessage
          description="Submit credit card payment"
          defaultMessage="Submit"
        />
      </Button>
    </Form>
  );
};

export default CreditCard;
