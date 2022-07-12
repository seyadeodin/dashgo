/* eslint-disable react/display-name */
import { 
  FormControl, 
  FormErrorMessage, 
  FormLabel, Input as ChakraInput, 
  InputProps as ChakraInputProps 
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps{
  name: string;
  label?: string;
  error?: FieldError;
}

export  const Input = forwardRef<HTMLInputElement, InputProps> (({ name, label, error = null, ...rest}, ref) => {
  return(
    <FormControl isInvalid={!!error}>
      {!! label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        {...rest}
        name={name}
        focusBorderColor="pink.500"
        bg="gray.900"
        variant="filled'"
        _hover={{
          bgColor: "gray.800"
        }}
        size="lg"
        ref={ref}
      />

      {
        !! error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )
      }
    </FormControl>
  )
})