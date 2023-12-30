import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { register } from 'redux/auth/operations';
import {
  SignUpContainer,
  SightUp,
  ErMsg,
  FormBtnStyled,
  BottleImg,
  StyledBtn,
  StyledField,
  StyledForm,
  Styledlabel,
} from './RegistrationForm.styled.js';
import sprite from '../../images/sprite.svg';
const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }, { resetForm }) => {
    dispatch(
      register({
        email,
        password,
      })
    );
    resetForm();
  };

  return (
    <SignUpContainer>
      <BottleImg />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors }) => (
          <StyledForm>
            <h2>Sign Up</h2>
            <Styledlabel>Enter your email</Styledlabel>
            <StyledField
              type="email"
              name="email"
              placeholder="E-mail"
              error={!!(touched.email && errors.email)}
            />
            <ErMsg name="email" component="div" />

            <Styledlabel>
              Enter your password
              <StyledBtn onClick={() => setShowPassword(!showPassword)}>
                <svg>
                  <use
                    href={sprite + (showPassword ? '#eye-show' : '#eye-hide')}
                  ></use>
                </svg>
              </StyledBtn>
            </Styledlabel>
            <StyledField
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              error={!!(touched.password && errors.password)}
            />

            <ErMsg name="password" component="div" />

            <Styledlabel>
              Repeat Password
              <StyledBtn
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                <svg>
                  <use
                    href={
                      sprite + (showRepeatPassword ? '#eye-show' : '#eye-hide')
                    }
                  ></use>
                </svg>
              </StyledBtn>
            </Styledlabel>
            <StyledField
              type={showRepeatPassword ? 'text' : 'password'}
              name="repeatPassword"
              placeholder="Repeat your password"
              error={!!(touched.repeatPassword && errors.repeatPassword)}
            />
            <ErMsg name="repeatPassword" component="div" />

            <FormBtnStyled type="submit" disabled={isSubmitting}>
              Sign Up
            </FormBtnStyled>
            <SightUp onClick={() => navigate('/signin')}>Sign in</SightUp>
          </StyledForm>
        )}
      </Formik>
    </SignUpContainer>
  );
};

export default RegistrationForm;
