/**
 * Centralized response wrapper.
 * All controllers must send responses through these helpers — never call res.json() directly.
 */

exports.sendSuccess = (res, data = {}, statusCode = 200) => {
    res.status(statusCode).json({ success: true, ...data })
}

exports.sendError = (res, message = 'Something went wrong', statusCode = 400) => {
    res.status(statusCode).json({ success: false, message })
}
