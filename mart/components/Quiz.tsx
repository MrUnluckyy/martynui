import {
  Box,
  Button,
  ButtonGroup,
  Highlight,
  Image,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { saveAs } from "file-saver";
import React, { ChangeEvent, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import Kuponas from "../public/assets/kuponas.jpg";

const Quiz = () => {
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;
  const [answers, setAnswers] = useState({
    first: "",
    second: "",
    third: "",
  });

  const onNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    }
    if (currentStep === 1) {
      handleFirstQuestion();
    }
  };

  const handleFirstQuestion = () => {
    if (answers.first == "23") {
      setCurrentStep(2);
    } else {
      toast({
        title: "Žinok ne...",
        description: "Teks labiau pasukt galvą.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleSecondQuestion = () => {
    if (answers.second == "Tatuiruotė") {
      setCurrentStep(3);
    } else {
      toast({
        title: "Nu ne...",
        description: `${answers.second} tikrai nėra gera dovana...`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleThirdQuestion = () => {
    if (answers.third == "yes") {
      setCurrentStep(4);
    } else {
      toast({
        title: "NETEISINGAI!",
        description: "Pabandyk dar karą",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onFistQuestionChange = (event: any) => {
    setAnswers({ ...answers, first: event });
  };

  const onSecondQuestionChange = (event: any) => {
    setAnswers({ ...answers, second: event });
  };
  const download = (e: any) => {
    console.log(e.target.href);
    fetch(e.target.href, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        toast({
          title: "Tadam!",
          description: "Nepamiršk pranešt kai pasidarysi",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // response.arrayBuffer().then(function (buffer) {
        //   const url = window.URL.createObjectURL(new Blob([buffer]));
        //   const link = document.createElement("a");
        //   link.href = url;
        //   link.setAttribute("download", "image.jpg"); //or any other extension
        //   document.body.appendChild(link);
        //   link.click();
        // });
      })
      .catch((err) => {
        toast({
          title: "UUUUPPPPSSS!",
          description: "Kažką pridirbau",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <Stack w="full">
      <Progress
        value={(currentStep / totalSteps) * 100}
        bg="gray.700"
        borderRadius="sm"
        colorScheme="green"
      />
      {currentStep === 0 && (
        <Stack p="8" textAlign="center">
          <Text fontSize="xl">Ar pasiruošęs?</Text>
          <Button
            rightIcon={<FiArrowRight />}
            colorScheme="green"
            onClick={onNext}
          >
            Važiuojam!
          </Button>
        </Stack>
      )}
      {currentStep === 1 && (
        <Stack p="8" textAlign="center" spacing="6">
          <Text fontSize="xl">Įvesk skaičių</Text>
          <Text fontSize="4xl">&#9996; &#128164;</Text>
          <NumberInput
            variant="filled"
            color="black"
            defaultValue={1}
            min={1}
            max={100}
            onChange={onFistQuestionChange}
          >
            <NumberInputField
              _focus={{
                bg: "gray.100",
              }}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Button
            rightIcon={<FiArrowRight />}
            colorScheme="green"
            onClick={handleFirstQuestion}
          >
            Kitas!
          </Button>
        </Stack>
      )}
      {currentStep === 2 && (
        <Stack p="8" textAlign="center" spacing="6">
          <Text fontSize="xl">Geriausia dovana yra:</Text>
          <RadioGroup onChange={onSecondQuestionChange}>
            <Stack spacing={4} direction="column">
              <Radio colorScheme="red" value="Saldainis">
                Saldainis
              </Radio>
              <Radio colorScheme="red" value="Gėlių puokštė">
                Gėlių puokštė
              </Radio>
              <Radio colorScheme="red" value="Puodelis">
                Puodelis
              </Radio>
              <Radio colorScheme="red" value="Gintarinis paveikslas">
                Gintarinis paveikslas
              </Radio>
              <Radio colorScheme="red" value="Dušo želė">
                Dušo želė
              </Radio>
              <Radio colorScheme="green" value="Tatuiruotė">
                Tatuiruotė
              </Radio>
            </Stack>
          </RadioGroup>

          <Button
            rightIcon={<FiArrowRight />}
            colorScheme="green"
            onClick={handleSecondQuestion}
          >
            Kitas!
          </Button>
        </Stack>
      )}
      {currentStep === 3 && (
        <Stack p="8" textAlign="center" spacing="6">
          <Text fontSize="xl">Ar šiais metais pasidarysi tatuiruote?</Text>
          <ButtonGroup justifyContent="center">
            <Button
              colorScheme={answers.third === "no" ? "blue" : "gray"}
              color="black"
              w="full"
              onClick={() => setAnswers({ ...answers, third: "no" })}
            >
              NE!
            </Button>
            <Button
              colorScheme={answers.third === "yes" ? "blue" : "gray"}
              color="black"
              w="full"
              onClick={() => setAnswers({ ...answers, third: "yes" })}
            >
              TAIP!
            </Button>
          </ButtonGroup>
          <Button
            rightIcon={<FiArrowRight />}
            colorScheme="green"
            onClick={handleThirdQuestion}
          >
            Kitas!
          </Button>
        </Stack>
      )}
      {currentStep === 4 && (
        <Stack p="8" textAlign="center" spacing="6">
          <Box fontWeight="bold">
            <Highlight
              query="PAVYKO!"
              styles={{ color: "green.400", fontWeight: "700" }}
            >
              TAU PAVYKO! Sveikinimai!
            </Highlight>
          </Box>
          <Text>O čia labai uždelsta dovanėlė!</Text>
          <Image src="/assets/kuponas.jpg" alt="" />

          <Button
            as={Link}
            href="/assets/kuponas.jpg"
            download
            colorScheme="green"
            onClick={download}
          >
            Parsisiųsti
          </Button>

          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1281002011&color=%232d3232&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          ></iframe>
          <div
            style={{
              fontSize: "10px",
              color: "#cccccc",
              lineBreak: "anywhere",
              wordBreak: "normal",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontFamily:
                "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
              fontWeight: "100",
            }}
          >
            <a
              href="https://soundcloud.com/nojus-lebskas"
              title="shxmxs"
              target="_blank"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              shxmxs
            </a>
            <a
              href="https://soundcloud.com/nojus-lebskas/su-gimtadieniu-1"
              title="Su Gimtadieniu !!!"
              target="_blank"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              Su Gimtadieniu !!!
            </a>
          </div>
        </Stack>
      )}
    </Stack>
  );
};

export default Quiz;
