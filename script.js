// Scripture verses database
const scriptures = {
    "2 Corinthians 5:17":
        "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
    "1 Corinthians 13:11":
        "When I was a child, I spake as a child, I understood as a child, I thought as a child: but when I became a man, I put away childish things.",
    "Matthew 3:8": "Bring forth therefore fruits meet for repentance.",
    "2 Corinthians 5:17":
        "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
    "Galatians 5:25":
        "If we live in the Spirit, let us also walk in the Spirit.",
    "Habakkuk 1:13":
        "Thou art of purer eyes than to behold evil, and canst not look on iniquity: wherefore lookest thou upon them that deal treacherously, and holdest thy tongue when the wicked devoureth the man that is more righteous than he?",
    "Romans 5:8":
        "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.",
    "Revelation 3:20":
        "Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him, and will sup with him, and he with me.",
    "Ephesians 4:1-2":
        "I therefore, the prisoner of the Lord, beseech you that ye walk worthy of the vocation wherewith ye are called, With all lowliness and meekness, with longsuffering, forbearing one another in love.",
    "2 Corinthians 12:6":
        "For though I would desire to glory, I shall not be a fool; for I will say the truth: but now I forbear, lest any man should think of me above that which he seeth me to be, or that he heareth of me.",
    "Romans 2:4":
        "Or despisest thou the riches of his goodness and forbearance and longsuffering; not knowing that the goodness of God leadeth thee to repentance?",
    "Proverbs 17:9":
        "He that covereth a transgression seeketh love; but he that repeateth a matter separateth very friends.",
    "Matthew 7:20": "Wherefore by their fruits ye shall know them.",
    "Titus 2:7-8":
        "In all things shewing thyself a pattern of good works: in doctrine shewing uncorruptness, gravity, sincerity, Sound speech, that cannot be condemned; that he that is of the contrary part may be ashamed, having no evil thing to say of you.",
    "2 Peter 3:1-2":
        "This second epistle, beloved, I now write unto you; in both which I stir up your pure minds by way of remembrance: That ye may be mindful of the words which were spoken before by the holy prophets, and of the commandment of us the apostles of the Lord and Saviour.",
    "Proverbs 15:18":
        "A wrathful man stirreth up strife: but he that is slow to anger appeaseth strife.",
    "Proverbs 16:32":
        "He that is slow to anger is better than the mighty; and he that ruleth his spirit than he that taketh a city.",
    "Proverbs 20:3":
        "It is an honour for a man to cease from strife: but every fool will be meddling.",
    "Romans 3:25":
        "Whom God hath set forth to be a propitiation through faith in his blood, to declare his righteousness for the remission of sins that are past, through the forbearance of God.",
};

// Tab functionality
document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        // Remove active class from all tabs and content
        document
            .querySelectorAll(".tab")
            .forEach((t) => t.classList.remove("active"));
        document
            .querySelectorAll(".content")
            .forEach((c) => c.classList.remove("active"));

        // Add active class to clicked tab
        tab.classList.add("active");

        // Show corresponding content
        const tabId = tab.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
    });
});

// Scripture modal functionality
const modal = document.getElementById("scriptureModal");
const scriptureTitle = document.getElementById("scriptureTitle");
const scriptureText = document.getElementById("scriptureText");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".read-scripture").forEach((button) => {
    button.addEventListener("click", () => {
        const reference = button.getAttribute("data-ref");
        scriptureTitle.textContent = reference;
        scriptureText.textContent =
            scriptures[reference] || "Scripture text not available.";
        modal.style.display = "block";
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Quiz functionality
document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () => {
        // Deselect other options in the same question
        const questionOptions = option
            .closest(".options")
            .querySelectorAll(".option");
        questionOptions.forEach((opt) => opt.classList.remove("selected"));

        // Select this option
        option.classList.add("selected");
    });
});

document.querySelector(".submit-quiz").addEventListener("click", () => {
    let score = 0;
    const questions = document.querySelectorAll(".question");
    const result = document.querySelector(".quiz-result");

    questions.forEach((question) => {
        const selectedOption = question.querySelector(".option.selected");
        if (
            selectedOption &&
            selectedOption.getAttribute("data-correct") === "true"
        ) {
            score++;
        }
    });

    const percentage = (score / questions.length) * 100;
    result.textContent = `You scored ${score} out of ${questions.length} (${percentage}%)`;
    result.style.display = "block";

    if (percentage >= 80) {
        result.style.backgroundColor = "#d4edda";
        result.style.color = "#155724";
    } else if (percentage >= 60) {
        result.style.backgroundColor = "#fff3cd";
        result.style.color = "#856404";
    } else {
        result.style.backgroundColor = "#f8d7da";
        result.style.color = "#721c24";
    }
});

// Save reflection functionality - using in-memory storage instead of localStorage
let savedReflection = "";

document.querySelector(".save-reflection").addEventListener("click", () => {
    const reflection = document.querySelector(".reflection-input").value;
    if (reflection.trim() !== "") {
        // Save to variable (in-memory storage)
        savedReflection = reflection;

        // Show saved message
        document.querySelector(".saved-message").style.display = "block";

        // Hide message after 3 seconds
        setTimeout(() => {
            document.querySelector(".saved-message").style.display = "none";
        }, 3000);
    }
});

// Note: Since we can't use localStorage in this environment,
// reflections will only persist during the current session
