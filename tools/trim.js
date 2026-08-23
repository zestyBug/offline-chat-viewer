import fs from "fs";

const path = process.argv[2];
let keycache = "";
if (path && fs.existsSync(path)) {
    const doc = JSON.parse(fs.readFileSync(path, "utf8"));
    const res = {
        title: doc.title || `Archived chat`,
        conversation_id: 0,
        mapping: {},
        current_node: doc.current_node || "",
    };
    for (const key in doc.mapping) {
        if (!Object.hasOwn(doc.mapping, key))
            continue;
        const content = doc.mapping[key];
        if(!content) continue;
        const message = content.message;
        if (message && message.author.role == "assistant" && message.content && message.content.content_type == "text") {
            const entry = {
                message: {
                    author  : {role: message.author.role},
                    metadata: {model_slug: message.metadata.model_slug},
                    content : {content_type: message.content.content_type, parts: message.content.parts},
                },
                parent  : content.parent,
                children: content.children,
            };
            res.mapping[key] = entry;
        } else if (message && message.author.role == "user" && message.content && message.content.content_type == "text") {
            const entry = {
                message: {
                    author  : {role: message.author.role},
                    content : {content_type: message.content.content_type, parts: message.content.parts},
                },
                parent  : content.parent,
                children: content.children,
            };
            res.mapping[key] = entry;
        } else if (message) {
            const entry = {
                message: {
                    author  : {role: message.author.role},
                },
                parent  : content.parent,
                children: content.children,
            };
            res.mapping[key] = entry;
        } else {
            const entry = {
                parent  : content.parent,
                children: content.children,
            };
            res.mapping[key] = entry;
        }
    }
    fs.writeFileSync(path, JSON.stringify(res), "utf8");
}