import { Request, Response } from "express-serve-static-core"
import axios from "axios";

import { config } from "../config/config";
import { executeProgramDtos } from "../dtos/executeProgram.dtos"

export const executeProgram = async (request: Request<{}, {}, executeProgramDtos>, response: Response) => {
    const {language, version, content, stdin} = request.body;

    if(!language || !version || !content) {
        response.status(400).json({
            success: false,
            message: "Missing language/version/content field!"
        })
    }

    const payload = {
            language: language,
            version: version,
            files: [
                {
                    "name": "my_cool_code.js",
                    "content": content
                }
            ],
            stdin: stdin || "",
            args: [],
            compile_timeout: 10000,
            run_timeout: 3000,
            compile_cpu_time: 10000,
            run_cpu_time: 3000,
            compile_memory_limit: -1,
            run_memory_limit: -1
    }

    const programExecutionResult = await axios.post(config.PISTON_URL + "/api/v2/execute", payload)
    
    response.json({
        success: true,
        result: programExecutionResult.data
    })
}
