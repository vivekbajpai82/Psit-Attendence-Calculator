function calculateAttendance() {
    let totalLectures = parseFloat(document.getElementById('totalLectures').value);
    let totalAbsent = parseFloat(document.getElementById('totalAbsent').value);
    let totalOAA = parseFloat(document.getElementById('totalOAA').value);

    if(isNaN(totalLectures) || isNaN(totalAbsent) || isNaN(totalOAA)) {
        document.getElementById('result').innerText = "Please enter all values!";
        document.getElementById('leaveResult').innerText = "";
        document.getElementById('progress').style.width = `0%`;
        return;
    }

    // Current attendance
    let attendance = 100 - ((totalAbsent - totalOAA) / totalLectures * 100);
    attendance = Math.min(attendance, 100).toFixed(2);
    document.getElementById('result').innerText = `Your Attendance Percentage: ${attendance}%`;

    // Progress bar
    let progress = document.getElementById('progress');
    progress.style.width = `${attendance}%`;
    progress.innerText = `${attendance}%`;
    if(attendance >= 90){
        progress.style.background = "#28a745"; // Green
    } else if(attendance >= 75){
        progress.style.background = "#ffc107"; // Yellow
    } else {
        progress.style.background = "#dc3545"; // Red
    }

    // Remaining leaves to maintain 90% attendance
    let target = 90;
    let maxAllowedAbsent = Math.floor(totalLectures - ((target / 100) * totalLectures) + totalOAA);
    let remainingLeaves = maxAllowedAbsent - totalAbsent;

    if(remainingLeaves < 0){
        document.getElementById('leaveResult').innerText = `You need to attend all remaining lectures to reach 90%.`;
    } else {
        document.getElementById('leaveResult').innerText = `You can take ${remainingLeaves} more lecture(s) leave to maintain 90% attendance.`;
    }
}
