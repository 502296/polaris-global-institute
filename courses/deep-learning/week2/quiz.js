const courseProgressKey = "polaris_progress";

function getProgress() {
    const saved = localStorage.getItem(courseProgressKey);
    return saved ? JSON.parse(saved) : {};
}

function saveProgress(progress) {
    localStorage.setItem(courseProgressKey, JSON.stringify(progress));
}

function markLectureComplete(week, lecture) {
    const progress = getProgress();

    if (!progress[week]) {
        progress[week] = {};
    }

    progress[week][lecture] = true;
    progress.lastWeek = week;
    progress.lastLecture = lecture;

    saveProgress(progress);
}

function isLectureUnlocked(week, lecture) {
    const progress = getProgress();

    if (lecture === 1) return true;

    return progress[week] && progress[week][lecture - 1] === true;
}

function goToLecture(week, lecture, fileName) {
    if (isLectureUnlocked(week, lecture)) {
        window.location.href = fileName;
    } else {
        alert("Please finish the previous lecture quiz first. \nيرجى إنهاء اختبار المحاضرة السابقة أولاً.");
    }
}

function resumeLastLecture(defaultFile = "week1.html") {
    const progress = getProgress();

    if (progress.lastWeek && progress.lastLecture) {
        const fileName = `week${progress.lastWeek}-lecture${progress.lastLecture}.html`;
        window.location.href = fileName;
    } else {
        window.location.href = defaultFile;
    }
}

function submitQuiz(week, lecture, correctAnswers) {
    let score = 0;
    let total = correctAnswers.length;

    correctAnswers.forEach((answer, index) => {
        const selected = document.querySelector(`input[name="q${index + 1}"]:checked`);
        if (selected && selected.value === answer) {
            score++;
        }
    });

    const resultBox = document.getElementById("quiz-result");
    const nextBtn = document.getElementById("next-lecture-btn");

    if (score === total) {
        markLectureComplete(week, lecture);

        if (resultBox) {
            resultBox.innerHTML = `
                <div style="color: green; font-weight: bold;">
                    Excellent! Quiz passed successfully. <br>
                    ممتاز! تم اجتياز الاختبار بنجاح.
                </div>
            `;
        }

        if (nextBtn) {
            nextBtn.style.display = "inline-block";
        }
    } else {
        if (resultBox) {
            resultBox.innerHTML = `
                <div style="color: red; font-weight: bold;">
                    You scored ${score}/${total}. Please try again. <br>
                    نتيجتك ${score}/${total}. حاول مرة أخرى.
                </div>
            `;
        }

        if (nextBtn) {
            nextBtn.style.display = "none";
        }
    }
}
