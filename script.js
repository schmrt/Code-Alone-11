// Ryan Schmelter
// Chat app

// Star Wars–themed chat data
const chatData = {
  general: [
    {
      sender: "Luke Skywalker",
      text: "May the Force be with you, everyone.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Always",
      fromSelf: true,
    },
    {
      sender: "Leia Organa",
      text: "Focus, team. We have a new transmission from Hoth Command.",
      fromSelf: false,
    },
  ],

  planning: [
    {
      sender: "Han Solo",
      text: "I've got a bad feeling about this mission...",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "It's just a quick hyperspace jump.",
      fromSelf: true,
    },
    {
      sender: "Chewbacca",
      text: "Rrrrghh!",
      fromSelf: false,
    },
    {
      sender: "Han Solo",
      text: "Chewie agrees. We should double-check the nav-computer.",
      fromSelf: false,
    },
  ],

  feedback: [
    {
      sender: "Obi-Wan Kenobi",
      text: "Remember: The Force will be with you, always.",
      fromSelf: false,
    },
    {
      sender: "Yoda",
      text: "Do or do not. There is no try.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Wise words",
      fromSelf: true,
    },
  ],
};

// Function that will get called when a channel is clicked
// Changes the highlight to the selected channel
function changeChannel(event) {
  let currentActive = document.querySelector(".active");
  console.log(event.target.dataset.channel);
  currentActive.classList.remove("active");
  let newActive = event.target;
  newActive.classList.add("active");

  // Update the title bar to match the selected channel
  let currentTitle = document.querySelector("#channel-title");
  console.log(currentTitle);
  currentTitle.textContent = newActive.textContent;

  // Call populateMessages function to update the messages with the selected channel
  populateMessages(event.target.dataset.channel);
}

function populateMessages(channelName) {
  console.log(chatData[channelName]);

  // Select all the current messages on screen
  let currentMessages = document.querySelectorAll(".message");
  console.log(currentMessages);

  // for loop to clear out currentMessages from the screen
  for (let message of currentMessages) {
    message.remove();
  }

  // for loop to place the new messages on screen
  for (let message of chatData[channelName]) {
    console.log(message.sender, message.text);

    // Use template to reconstruct the messages
    let template = document.querySelector("template");
    let newMessages = document.importNode(template.content, true);

    // Set the text of the messages to match the new chat
    newMessages.querySelector(".sender").innerText = message.sender + ":";
    newMessages.querySelector(".text").innerText = message.text;

    // If the message is from self apply the CSS styling by adding the self class
    if (message.fromSelf) {
      newMessages.querySelector(".message").classList.add("self");
    }

    // Add messages to screen
    document.querySelector("#chat-messages").appendChild(newMessages);
  }
}

function initializeEventListeners() {
  // Select all channels by the "channel" class and store in channels var
  let channels = document.querySelectorAll(".channel");

  // for loop that adds an event listener to each button and calls changeChannel on click
  for (let button of channels) {
    button.addEventListener("click", changeChannel);
  }

  // Send button has no id/class, so find it inside the #chat-form div
  document
    .querySelector("#chat-form button")
    .addEventListener("click", sendMessage);
}

function sendMessage() {
  // Read what the user typed
  let input = document.querySelector("#message-input");
  let messageToSend = input.value;

  // Don't send empty messages
  if (messageToSend.trim() === "") {
    return;
  }

  // Find which channel is currently active
  let currentChannel = document.querySelector(".active").dataset.channel;

  // Save the message to the data object
  chatData[currentChannel].push({
    sender: "You",
    text: messageToSend,
    fromSelf: true,
  });

  // Redraw the chat (includes the new message, styled as self)
  populateMessages(currentChannel);

  // Clear the input box
  input.value = "";
}

initializeEventListeners();
// Make sure that general messages populate on page load and not the alex placeholder
populateMessages("general");
