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

សូមស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រងសិស្ស។

គណនីរបស់អ្នកត្រូវបានបង្កើតដោយអ្នកគ្រប់គ្រង។

លេខកូដ OTP របស់អ្នកគឺ៖ ${otpCode}

លេខកូដនេះនឹងផុតកំណត់ក្នុងរយៈពេល 5 នាទី។

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
<!-- OTP BOX -->
<!-- ======================================== -->

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
>

<tr>

<td align="center">


<div
    style="
        background:#f0fdf4;
        border:2px solid #86efac;
        border-radius:15px;
        padding:25px 15px;
        margin:10px 0 22px 0;
    "
>


<p
    style="
        margin:0 0 12px 0;
        color:#6b7280;
        font-size:13px;
        font-weight:bold;
    "
>
    🔐 លេខកូដផ្ទៀងផ្ទាត់របស់អ្នក
</p>


<div
    style="
        color:#15803d;
        font-size:38px;
        font-weight:700;
        letter-spacing:8px;
        padding-left:8px;
    "
>
    ${otpCode}
</div>


<p
    style="
        margin:12px 0 0 0;
        color:#6b7280;
        font-size:12px;
    "
>
    លេខកូដ 6 ខ្ទង់
</p>


</div>

</td>

</tr>

</table>


<!-- ======================================== -->
<!-- EXPIRATION -->
<!-- ======================================== -->

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
>

<tr>

<td
    style="
        background:#fffbeb;
        border-radius:10px;
        padding:15px 18px;
    "
>

<p
    style="
        margin:0;
        color:#92400e;
        font-size:14px;
        line-height:1.8;
    "
>

    ⏰

    <strong>
        សូមប្រើលេខកូដនេះក្នុងរយៈពេល 5 នាទី។
    </strong>

    <br>

    បន្ទាប់ពី 5 នាទី លេខកូដនេះនឹងផុតកំណត់។

</p>

</td>

</tr>

</table>


<br>


<!-- ======================================== -->
<!-- SECURITY MESSAGE -->
<!-- ======================================== -->

<p
    style="
        margin:0;
        color:#6b7280;
        font-size:14px;
        line-height:2;
    "
>

    🔒 <strong>សុវត្ថិភាពគណនី</strong>

    <br>

    សូមកុំចែករំលែកលេខកូដ OTP នេះ
    ជាមួយអ្នកដទៃ។

    <br>

    ប្រសិនបើអ្នកមិនបានស្នើសុំការផ្ទៀងផ្ទាត់នេះទេ
    សូមមិនអើពើនឹងអ៊ីមែលនេះ។

</p>


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