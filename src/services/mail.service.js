const nodemailer = require("nodemailer");


// ========================================
// SMTP CONFIG
// ========================================

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// ========================================
// SEND OTP EMAIL
// ========================================

const sendOTPEmail = async (email, otpCode) => {

    try {

        console.log("========== SEND OTP ==========");
        console.log("To:", email);
        console.log("OTP:", otpCode);

        const codeStr = String(otpCode || "").trim();
        const d = [
            codeStr[0] || "",
            codeStr[1] || "",
            codeStr[2] || "",
            codeStr[3] || "",
            codeStr[4] || "",
            codeStr[5] || ""
        ];


        const info = await transporter.sendMail({

            from:
                `"ប្រព័ន្ធគ្រប់គ្រងសិស្ស" <${process.env.EMAIL_USER}>`,

            to: email,

            subject:
                "លេខកូដផ្ទៀងផ្ទាត់អ៊ីមែល | ប្រព័ន្ធគ្រប់គ្រងសិស្ស",


            // ========================================
            // PLAIN TEXT
            // ========================================

            text: `
សួស្តី!

សូមស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រងសិស្ស (Student Management System)។

គណនីរបស់អ្នកត្រូវបានបង្កើតដោយអ្នកគ្រប់គ្រង។
សូមប្រើប្រាស់លេខកូដផ្ទៀងផ្ទាត់ (OTP) ខាងក្រោមដើម្បីផ្ទៀងផ្ទាត់អ៊ីមែលរបស់អ្នក៖

==================================================
  លេខកូដ OTP របស់អ្នក៖   ${codeStr}
==================================================

⏱️ សុពលភាព៖ លេខកូដនេះនឹងផុតកំណត់ក្នុងរយៈពេល 5 នាទី។
🔒 សុវត្ថិភាព៖ សូមកុំចែករំលែកលេខកូដនេះជាមួយនរណាម្នាក់ឡើយ។

ប្រសិនបើអ្នកមិនបានស្នើសុំការផ្ទៀងផ្ទាត់នេះទេ
សូមមិនអើពើនឹងអ៊ីមែលនេះ។

សូមអរគុណ!
ប្រព័ន្ធគ្រប់គ្រងសិស្ស
            `,


            // ========================================
            // HTML EMAIL
            // ========================================

            html: `

<!DOCTYPE html>

<html lang="km">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>ការផ្ទៀងផ្ទាត់អ៊ីមែល</title>

</head>


<body
    style="
        margin:0;
        padding:0;
        background:#f0fdf4;
        font-family:
            'Noto Sans Khmer',
            Arial,
            Helvetica,
            sans-serif;
    "
>


<!-- ======================================== -->
<!-- OUTER CONTAINER -->
<!-- ======================================== -->

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background:#f0fdf4;
        padding:35px 15px;
    "
>

<tr>

<td align="center">


<!-- ======================================== -->
<!-- MAIN CARD -->
<!-- ======================================== -->

<table
    width="600"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        max-width:600px;
        width:100%;
        background:#ffffff;
        border-radius:18px;
        overflow:hidden;
        box-shadow:
            0 8px 30px rgba(0,0,0,0.08);
    "
>


<!-- ======================================== -->
<!-- HEADER -->
<!-- ======================================== -->

<tr>

<td
    align="center"
    style="
        background:#16a34a;
        padding:35px 20px;
    "
>


<!-- LOGO / ICON -->

<div
    style="
        width:72px;
        height:72px;
        line-height:72px;
        background:#ffffff;
        border-radius:50%;
        margin:0 auto 16px auto;
        font-size:32px;
    "
>
    🎓
</div>


<!-- SYSTEM NAME -->

<h1
    style="
        margin:0;
        color:#ffffff;
        font-size:25px;
        font-weight:700;
    "
>
    ប្រព័ន្ធគ្រប់គ្រងសិស្ស
</h1>


<p
    style="
        margin:8px 0 0 0;
        color:#dcfce7;
        font-size:14px;
    "
>
    Student Management System
</p>


</td>

</tr>


<!-- ======================================== -->
<!-- CONTENT -->
<!-- ======================================== -->

<tr>

<td
    style="
        padding:40px 40px 30px 40px;
    "
>


<!-- TITLE -->

<h2
    style="
        margin:0 0 15px 0;
        color:#166534;
        font-size:22px;
        font-weight:700;
    "
>
    សូមផ្ទៀងផ្ទាត់អ៊ីមែលរបស់អ្នក
</h2>


<!-- GREETING -->

<p
    style="
        margin:0 0 22px 0;
        color:#374151;
        font-size:15px;
        line-height:2;
    "
>

    សួស្តី! 👋

    <br>

    សូមស្វាគមន៍មកកាន់
    <strong style="color:#16a34a;">
        ប្រព័ន្ធគ្រប់គ្រងសិស្ស
    </strong>។

    <br>

    គណនីរបស់អ្នកត្រូវបានបង្កើតដោយអ្នកគ្រប់គ្រង។
    សូមប្រើលេខកូដខាងក្រោម ដើម្បីផ្ទៀងផ្ទាត់
    អ៊ីមែលរបស់អ្នក។

</p>


<!-- ======================================== -->
<!-- STANDARDIZED OTP VERIFICATION AREA -->
<!-- ======================================== -->

<table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background:#f0fdf4;
        border:2px solid #86efac;
        border-radius:16px;
        margin:15px 0 25px 0;
        overflow:hidden;
    "
>

<tr>

<td
    align="center"
    style="
        padding:28px 18px 24px 18px;
    "
>

<!-- BADGE HEADER -->
<table
    role="presentation"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="margin-bottom:16px;"
>
<tr>
    <td
        align="center"
        style="
            background:#dcfce7;
            border:1px solid #bbf7d0;
            border-radius:20px;
            padding:5px 14px;
            color:#166534;
            font-size:12px;
            font-weight:700;
            letter-spacing:0.5px;
            text-transform:uppercase;
        "
    >
        🔐 លេខកូដផ្ទៀងផ្ទាត់សុវត្ថិភាព • VERIFICATION CODE
    </td>
</tr>
</table>

<!-- 6 INDIVIDUAL DIGIT BOXES (3-3 CHUNKED) -->
<table
    role="presentation"
    cellpadding="0"
    cellspacing="0"
    border="0"
    align="center"
    style="margin:0 auto;"
>
<tr>
    <!-- DIGIT 1 -->
    <td
        align="center"
        valign="middle"
        style="
            width:44px;
            height:54px;
            background:#ffffff;
            border:2px solid #16a34a;
            border-radius:10px;
            color:#15803d;
            font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Courier New',monospace;
            font-size:30px;
            font-weight:800;
            text-align:center;
            line-height:54px;
            box-shadow:0 2px 4px rgba(22,163,74,0.12);
        "
    >${d[0]}</td>

    <td width="8" style="width:8px;font-size:1px;line-height:1px;">&nbsp;</td>

    <!-- DIGIT 2 -->
    <td
        align="center"
        valign="middle"
        style="
            width:44px;
            height:54px;
            background:#ffffff;
            border:2px solid #16a34a;
            border-radius:10px;
            color:#15803d;
            font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Courier New',monospace;
            font-size:30px;
            font-weight:800;
            text-align:center;
            line-height:54px;
            box-shadow:0 2px 4px rgba(22,163,74,0.12);
        "
    >${d[1]}</td>

    <td width="8" style="width:8px;font-size:1px;line-height:1px;">&nbsp;</td>

    <!-- DIGIT 3 -->
    <td
        align="center"
        valign="middle"
        style="
            width:44px;
            height:54px;
            background:#ffffff;
            border:2px solid #16a34a;
            border-radius:10px;
            color:#15803d;
            font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Courier New',monospace;
            font-size:30px;
            font-weight:800;
            text-align:center;
            line-height:54px;
            box-shadow:0 2px 4px rgba(22,163,74,0.12);
        "
    >${d[2]}</td>

    <!-- SEPARATOR -->
    <td
        width="18"
        align="center"
        valign="middle"
        style="
            width:18px;
            color:#86efac;
            font-size:24px;
            font-weight:bold;
            line-height:54px;
            text-align:center;
        "
    >&bull;</td>

    <!-- DIGIT 4 -->
    <td
        align="center"
        valign="middle"
        style="
            width:44px;
            height:54px;
            background:#ffffff;
            border:2px solid #16a34a;
            border-radius:10px;
            color:#15803d;
            font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Courier New',monospace;
            font-size:30px;
            font-weight:800;
            text-align:center;
            line-height:54px;
            box-shadow:0 2px 4px rgba(22,163,74,0.12);
        "
    >${d[3]}</td>

    <td width="8" style="width:8px;font-size:1px;line-height:1px;">&nbsp;</td>

    <!-- DIGIT 5 -->
    <td
        align="center"
        valign="middle"
        style="
            width:44px;
            height:54px;
            background:#ffffff;
            border:2px solid #16a34a;
            border-radius:10px;
            color:#15803d;
            font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Courier New',monospace;
            font-size:30px;
            font-weight:800;
            text-align:center;
            line-height:54px;
            box-shadow:0 2px 4px rgba(22,163,74,0.12);
        "
    >${d[4]}</td>

    <td width="8" style="width:8px;font-size:1px;line-height:1px;">&nbsp;</td>

    <!-- DIGIT 6 -->
    <td
        align="center"
        valign="middle"
        style="
            width:44px;
            height:54px;
            background:#ffffff;
            border:2px solid #16a34a;
            border-radius:10px;
            color:#15803d;
            font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Courier New',monospace;
            font-size:30px;
            font-weight:800;
            text-align:center;
            line-height:54px;
            box-shadow:0 2px 4px rgba(22,163,74,0.12);
        "
    >${d[5]}</td>
</tr>
</table>

<!-- ONE-CLICK QUICK COPY CODE PILL -->
<p
    style="
        margin:16px 0 0 0;
        color:#4b5563;
        font-size:13px;
        text-align:center;
        font-family:'Noto Sans Khmer',Arial,sans-serif;
    "
>
    លេខកូដចម្លងរហ័ស (Quick Copy):
    <strong
        style="
            display:inline-block;
            font-family:Consolas,'Courier New',monospace;
            font-size:15px;
            color:#15803d;
            background:#ffffff;
            border:1px dashed #86efac;
            padding:3px 10px;
            border-radius:6px;
            letter-spacing:3px;
            user-select:all;
            -webkit-user-select:all;
            margin-left:4px;
        "
    >${codeStr}</strong>
</p>

<!-- INTEGRATED EXPIRATION BADGE -->
<table
    role="presentation"
    cellpadding="0"
    cellspacing="0"
    border="0"
    align="center"
    style="margin:16px auto 0 auto;"
>
<tr>
    <td
        align="center"
        style="
            background:#fef3c7;
            border:1px solid #fde68a;
            border-radius:20px;
            padding:5px 14px;
            color:#92400e;
            font-size:12.5px;
            font-weight:600;
        "
    >
        ⏱️ មានសុពលភាពត្រឹមតែ 5 នាទីប៉ុណ្ណោះ (Valid for 5 minutes)
    </td>
</tr>
</table>

</td>

</tr>

</table>


<!-- ======================================== -->
<!-- SECURITY ADVISORY -->
<!-- ======================================== -->

<table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background:#f8fafc;
        border:1px solid #e2e8f0;
        border-radius:12px;
        padding:14px 16px;
        margin:0 0 10px 0;
    "
>

<tr>

<td width="28" valign="top" style="font-size:18px;line-height:1.4;padding-right:6px;">
    🔒
</td>

<td style="color:#475569;font-size:13px;line-height:1.7;">
    <strong style="color:#1e293b;">ការការពារសុវត្ថិភាពគណនី៖</strong>
    <br>
    សូមកុំចែករំលែកលេខកូដ OTP នេះទៅកាន់បុគ្គលណាផ្សេងឡើយ។ អ្នកគ្រប់គ្រងប្រព័ន្ធនឹងមិនស្នើសុំលេខកូដនេះពីអ្នកជាដាច់ខាត។
    ប្រសិនបើអ្នកមិនបានស្នើសុំការផ្ទៀងផ្ទាត់នេះទេ សូមកុំអើពើនឹងអ៊ីមែលនេះ។
</td>

</tr>

</table>


</td>

</tr>


<!-- ======================================== -->
<!-- FOOTER -->
<!-- ======================================== -->

<tr>

<td
    align="center"
    style="
        background:#f9fafb;
        border-top:1px solid #e5e7eb;
        padding:25px 20px;
    "
>


<p
    style="
        margin:0 0 8px 0;
        color:#166534;
        font-size:15px;
        font-weight:bold;
    "
>
    🎓 ប្រព័ន្ធគ្រប់គ្រងសិស្ស
</p>


<p
    style="
        margin:0;
        color:#9ca3af;
        font-size:12px;
        line-height:1.8;
    "
>
    នេះជាអ៊ីមែលដែលបានផ្ញើដោយស្វ័យប្រវត្តិ។
    <br>
    សូមកុំឆ្លើយតបតាមរយៈអ៊ីមែលនេះ។
</p>


<p
    style="
        margin:12px 0 0 0;
        color:#9ca3af;
        font-size:11px;
    "
>
    © ${new Date().getFullYear()}
    Student Management System
</p>


</td>

</tr>


</table>


</td>

</tr>

</table>


</body>

</html>

            `
        });


        console.log(
            "Email sent successfully:",
            info.messageId
        );

        return info;


    } catch (error) {

        console.error(
            "SEND OTP ERROR:",
            error
        );

        throw error;
    }
};


// ========================================
// EXPORT
// ========================================

module.exports = {
    sendOTPEmail
};