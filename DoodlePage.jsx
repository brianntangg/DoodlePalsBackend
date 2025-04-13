import {
  Image,
  HStack,
  Heading,
  VStack,
  Flex,
  Box,
  Textarea,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDb } from "../contexts/DatabaseProvider";

function DoodlePage() {
  const [doodle, setDoodle] = useState(null);
  const [usernames, setUsernames] = useState([]);
  const [prompt, setPrompt] = useState("Loading prompt...");
  const db = useDb();

  useEffect(() => {
    db.getPrompt().then(data => setPrompt(data.prompt));
  }, []);

  async function handleNextPrompt() {
    const data = await db.getNextPrompt();
    setPrompt(data.prompt);
  }

  if (!doodle || !usernames) {
    return null;
  }

  return (
    <>
      <Heading size="lg" textAlign="center" mt={12}>
        {doodle.title}
      </Heading>

      <Box 
        mx="auto" 
        mt={6} 
        p={6} 
        maxW="800px"
        borderRadius="lg"
        bg="white"
        shadow="md"
      >
        <Heading size="md" mb={4}>Today's Prompt:</Heading>
        <Text fontSize="xl" mb={4}>{prompt}</Text>
        <Button 
          colorScheme="teal" 
          onClick={handleNextPrompt}
          size="sm"
        >
          Get Next Prompt
        </Button>
      </Box>

      <HStack mt={12} spacing={20} justify="center">
        {/* ... rest of your existing JSX ... */}
      </HStack>
    </>
  );
}

export default DoodlePage; 