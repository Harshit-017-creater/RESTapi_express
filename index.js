const express = require("express");
const members = require("./Members");
const app = express();
const uuid = require("uuid");
// console.log(members);
app.use(express.json());

app.get("/api/members", (req, res) => {
	return res.status(200).json({ members });
});
app.get("/api/members/:id ", (req, res) => {
	const found = members.some((m) => m.id === parseInt(req.params.id));
	if (found) {
		return res.json(members.filter((m) => m.id === parseInt(req.params.id)));
	} else {
		return res.status(400).json({ msg: `No member found ${req.params.id}` });
	}
});
app.post("/api/members", (req, res) => {
	const { name, email } = { ...req.body };
	const newMember = {
		id: uuid.v4(),
		name,
		email,
		status: "active",
	};
	if (!newMember.name || !newMember.email) {
		return res.status(400).json({ msg: "No blank accepted" });
	} else {
		members.push(newMember);
		return res.status(200).json({ msg: "Members Added succefully" });
	}
});
app.put("/api/members/:id", (req, res) => {
	const found = members.some((s) => s.id === parseInt(req.params.id));
	if (found) {
		const updMember = req.body;
		members.forEach((insann) => {
			if (insann.id === parseInt(req.params.id)) {
				insann.name = updMember.name;
				insann.email = updMember.email;
				return res.json({ msg: "members updated", member: insann });
			}
		});
	} else {
		return res.status(400).json({ msg: `No member found  ${req.params.id}` });
	}
});
app.delete("/api/members/:id", (req, res) => {
	const found = members.some((m) => m.id === parseInt(req.params.id));
	if (found) {
		return res.json({
			msg: "Member Deleted",
			members: members.filter(
				(member) => member.id !== parseInt(req.params.id)
			),
		});
	} else {
		return res.status(400).json({ msg: `No member found  ${req.params.id}` });
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running at ${PORT} id`));
