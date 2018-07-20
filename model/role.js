/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

// Partecipating roles
class Role {
    constructor(name = 'New role') {
        this.guid = null;
        this.name = name;
        this.class = null;
        this.members = []; // Array of security identifiers (SID)
    }
    get guid() {
        return this.guid;
    }
    get name() {
        return this.name;
    }
    set name(value) {
        this.name = value;
    }
    add(member) {
        if (!this.members.includes(member))
            this.members.push(member);
    }
    remove(member) {
        let i = this.members.indexOf(member);
        if (i !== -1)
            this.members.splice(i, 1);
    }
}

// A policy is what a role can do rwx
const policyEnum = { r: 1, w: 2, x: 4 };

class Policy {
    constructor(role, policy) {
        if (role instanceof Role) {
            this.role = role;
            this.policy = policy | policyEnum.r;
        }
    }
    get policy() {}
}