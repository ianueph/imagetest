import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    // Rudimentary ui for testing purposes
    res.send(`
        <form action="/image/crud/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="photo" />
            <input type="submit">
        </form>
    `);
});

export default router;