// dealing with user account entries
const path = require('path');
const fs = require('fs');
const { DB } = require('./db');
const { MailMan } = require('./mail');

class UserService {
    init(app){
        // about user register entries
        app.post('/register',this.register);
        app.get('/checkmail',this.checkmail);
        app.post('/login',this.login);
        app.get('/forget_pass',this.forget_pass);
        app.get('/verify_manual',this.verify_manual); // user get the mail , and then they can type it for themself
        app.post('/user_basicInfo_update',this.user_basicInfo_update);
        app.post('/user_props_insertORupdate',this.user_props_insertORupdate);
        app.post('/user_props_delete',this.user_props_delete);
        app.post('/user_furni_insertORupdate',this.user_furni_insertORupdate);
        app.post('/user_furni_delete',this.user_furni_delete);
        app.post('/user_favShop_set',this.user_favShop_set);
        app.post('/user_eventColl_set',this.user_eventColl_set);
        app.post('/user_achieveColl_set',this.user_achieveColl_set);
        app.post('/user_charaColl_set',this.user_charaColl_set);
        app.post('/user_streetView_set',this.user_streetView_set);
        app.post('/user_decoration_record',this.user_decoration_record);
        app.get('/get_userInfo',this.get_userInfo);
        // about shop keeper register entries
        app.post('/register_shop',this.register_shop);
        app.post('/login_shop',this.login_shop);
        app.get('/forget_pass_shop',this.forget_pass_shop);
        app.get('/verify_manual_shop',this.verify_manual_shop);
        app.get('/update_time_shop',this.update_time_shop);
        app.get('/add_problem_report',this.add_problem_report);
        app.get('/shopName2shopID',this.shopName2shopID);
        app.post('/set_shopInfo',this.set_shopInfo);
        // about user comment 
        app.post('/upload_comment',this.upload_comment); // using multer to get binary!! (req.file & req.body)
        app.get('/get_shopOwnerInfo',this.get_shopOwnerInfo); 
        app.get('/get_shopInfo',this.get_shopInfo);
        app.get('/get_shopComm',this.get_shopComm);
    }
    // about user register entries
    register(req,res){
        // fetch variable
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const ltype = ( req.body.ltype == undefined ? 'TW' : req.body.ltype );
        console.log(`Username: ${username}, Password: ${password}, Email: ${email}`);
        // get register function
        DB.user_register(username,password,email,function(err,msg){
            if(err){
                res.end(msg);
            }
            else{
                // response
                res.end(msg);
                // email to notify this user !
                var content = fs.readFileSync(path.join(__dirname,'mail',ltype,'congratulation.txt'),'utf-8');
                // mailing
                MailMan.mail(email,"NavGamer System Notify Mail",content,function(err,msg){
                    console.log(msg);
                });
            }
        });
    }

    user_basicInfo_update(req,res){
        const basic = req.body;
        console.log(`User Basic Info update! Username: ${basic.username}, Password: ${basic.password}`);
        DB.user_basicInfo_update(basic.username,basic.password,basic.charID,
            basic.strength,basic.intelligence,basic.like,
            basic.money,basic.hour,basic.level,function(err,msg){
                if(err)
                    res.end(msg);
                else
                    res.end(msg);
        });
    }

    user_props_insertORupdate(req,res){
        const propsObj = req.body;
        DB.user_props_insertORupdate(propsObj.username,propsObj.password,
            JSON.parse(propsObj.props_quant_array),function(err,msg){
                if(err)
                    res.end(msg);
                else
                    res.end(msg);
        });
    }

    user_props_delete(req,res){
        const propsObj = req.body;
        DB.user_props_delete(propsObj.username,propsObj.password,
            JSON.parse(propsObj.props_quant_array),function(err,msg){
                if(err)
                    res.end(msg);
                else
                    res.end(msg);
        });
    }

    user_furni_insertORupdate(req,res){
        const furniObj = req.body;
        DB.user_props_delete(furniObj.username,furniObj.password,
            JSON.parse(furniObj.furni_quant_array),function(err,msg){
                if(err)
                    res.end(msg);
                else
                    res.end(msg);
        });
    }

    user_furni_delete(req,res){
        const furniObj = req.body;
        DB.user_props_delete(furniObj.username,furniObj.password,
            JSON.parse(furniObj.furni_quant_array),function(err,msg){
                if(err)
                    res.end(msg);
                else
                    res.end(msg);
        });
    }

    user_favShop_set(req,res){
        DB.user_favShop_set(req.body.username,req.body.password,
            JSON.parse(req.body.fav_shopID_list),function(err,msg){
                if(err)
                    res.end(msg);
                else 
                    res.end(msg);
        });
    }

    user_eventColl_set(req,res){
        DB.user_eventColl_set(req.body.username,req.body.password,
            JSON.parse(req.body.event_coll_list),function(err,msg){
                if(err)
                    res.end(msg);
                else 
                    res.end(msg);
        });
    }

    user_achieveColl_set(req,res){
        DB.user_achieveColl_set(req.body.username,req.body.password,
            JSON.parse(req.body.achieve_coll_list),function(err,msg){
                if(err)
                    res.end(msg);
                else
                    res.end(msg);
        });
    }

    user_charaColl_set(req,res){
        DB.user_achieveColl_set(req.body.username,req.body.password,
            JSON.parse(req.body.chara_coll_list),function(err,msg){
                if(err)
                    res.end(msg);
                else
                    res.end(msg);
        });
    }

    user_streetView_set(req,res){
        DB.user_streetView_set(req.body.username,req.body.password,req.body.mode_flag,
            req.body.obj_flag,req.body.info_flag,function(err,msg){
                if(err)
                    res.end(msg);
                else
                    res.end(msg);
            });
    }

    user_decoration_record(req,res){
        DB.user_decoration_record(req.body.username,req.body.password,
            JSON.parse(req.body.decoration_record),function(err,msg){
                if(err)
                    res.end(msg);
                else
                    res.end(msg);
        });
    }

    get_userInfo(req,res){
        DB.user_fetch(req.query.username,function(err,msg){
            if(err)
                res.end(msg);
            else
                res.end(JSON.stringify(msg));
        });
    }

    login(req,res){
        const username = req.body.username;
        const password = req.body.password;
        console.log(`Username: ${username}, Password: ${password}`);
        // get login function
        DB.user_login(username,password,function(err,msg){
            if(err){
                res.end(msg);
            }
            else{
                res.end(msg);
            }
        });
    }

    forget_pass(req,res){
        const username = req.query.username;
        const ltype = ( req.query.ltype == undefined ? 'TW' : req.query.ltype );
        // using username to find and generate code for it
        DB.user_gettmpcode(username,function(err,msg){
            if(err)
                res.end(msg);
            else{
                // using msg as user mail to deliver
                var content = fs.readFileSync(path.join(__dirname,'mail',ltype,'verify.txt'),'utf-8');
                // mailing
                MailMan.mail(msg.email,"NavGamer - Forget password recovery rules",content,function(err,m_msg){
                    if(err){
                        // Error
                        MailMan.mail(msg.email,"[Error] NavGamer - code for recovery","Internal Server error",function(err,m_msg){                    
                            res.end("internal error");
                        });
                    }
                    else{
                        // And then send another one for code!
                        MailMan.mail(msg.email,"NavGamer - code for recovery",msg.code,function(err,m_msg){                    
                            res.end("Check your mail");
                        });
                    }
                });
            }
        })
    }

    verify_manual(req,res){
        const username = req.query.username;
        const code = req.query.code;
        // verify by db 
        DB.user_verify(username,code,function(err,msg){
            if(err){
                res.end(msg)
            }
            else{
                MailMan.mail(msg.email,"NavGamer - Your password",msg.password,function(err,m_msg){                    
                    res.end("password send");
                });
            }
        })
    }

    checkmail(req,res){
        const email = req.query.email;
        console.log("Checking mail...");
        DB.user_checkmail(email,function(err,msg){
            console.log("Checking mail result: " + msg);
            if(err){
                res.end(msg);
            }
            else{
                res.end(msg);
            }
        })
    }
    // about shop keeper register entries
    register_shop(req,res){
        const owner = req.body;
        const ltype = ( req.body.ltype == undefined ? 'TW' : req.body.ltype );
        DB.shopkeeper_register(owner.shopID,owner.password,owner.email,owner.shopName,
            owner.shopAddress,owner.phone,owner.category_1,owner.category_2,
            owner.shop_principal,owner.shop_principal_gender,owner.shop_principal_phone,
            owner.shop_principal_email,function(err,msg){
                if(err)
                    res.end(msg)
                else{
                    res.end(msg);
                    // email to notify this user !
                    var content = fs.readFileSync(path.join(__dirname,'mail',ltype,'congratulation.txt'),'utf-8');
                    // mailing
                    MailMan.mail(owner.email,"NavGamer System Notify Mail(For Shop keeper)",content,function(err,msg){
                        console.log(msg);
                    });
                }
            });
    }

    login_shop(req,res){
        const shopID = req.body.shopID, password = req.body.password;
        DB.shopkeeper_login(shopID,password,function(err,msg){
            if(err)
                res.end(msg);
            else{
                res.end(msg);
            }
        });
    }

    forget_pass_shop(req,res){
        const shopID = req.query.shopID;
        const ltype = ( req.query.ltype == undefined ? 'TW' : req.query.ltype );
        DB.shopkeeper_gettmpcode(shopID,function(err,msg){
            if(err)
                res.end(msg);
            else{
                // using msg as user mail to deliver
                var content = fs.readFileSync(path.join(__dirname,'mail',ltype,'verify_shop.txt'),'utf-8');
                // mailing
                MailMan.mail(msg.email,"NavGamer - Forget password recovery rules",content,function(err,m_msg){
                    if(err){
                        // Error
                        MailMan.mail(msg.email,"[Error] NavGamer - code for recovery","Internal Server error",function(err,m_msg){                    
                            res.end("internal error");
                        });
                    }
                    else{
                        // And then send another one for code!
                        MailMan.mail(msg.email,"NavGamer - code for recovery",msg.code,function(err,m_msg){                    
                            res.end("Check your mail");
                        });
                    }
                });
            }
        })
    }

    verify_manual_shop(req,res){
        const shopID = req.query.shopID;
        const code = req.query.code;
        // verify
        DB.shopkeeper_verify(shopID,code,function(err,msg){
            if(err)
                res.end(msg);
            else{
                MailMan.mail(msg.email,"NavGamer - Your password",msg.password,function(err,m_msg){                    
                    res.end("password send");
                });
            }
        });
    }

    checkmail_shop(req,res){
        const email = req.query.email;
        DB.shopkeeper_checkmail(email,function(err,msg){
            if(err){
                res.end(msg);
            }
            else{
                res.end(msg);
            }
        })
    }

    update_time_shop(req,res){

    }

    add_problem_report(req,res){
        
    }

    shopName2shopID(req,res){
        DB.shopName2shopID(req.query.shopName,function(err,msg){
            if(err)
                res.end(msg);
            else
                res.end(msg); // now msg = shopID (which has been found)
        });
    }
    
    get_shopOwnerInfo(req,res){
        // using shopID to get information of shop owner information (distinguish from comment)
        DB.shopkeeper_fetch(req.query.shopID,function(err,msg){
            if(err)
                res.end(msg);
            else
                res.end(JSON.stringify(msg)); // json_obj need, to be stringify
        });
    }

    get_shopInfo(req,res){
        // using shopID to get information of shop information
        DB.shopInfo_download(req.query.shopID,function(err,msg){
            if(err)
                res.end(msg);
            else
                res.end(JSON.stringify(msg)); // stringify json object
        });
    }

    set_shopInfo(req,res){
        // need password to set shopinfo
        const infoBody = req.body;
        DB.shopInfo_update(infoBody.shopID,infoBody.password,infoBody.shopName,
            infoBody.shopAddress,JSON.parse(infoBody.openTime),JSON.parse(infoBody.infoList),function(err,msg){
                if(err)
                    res.end(msg);
                else
                    res.end(msg);
            })
    }

    // about user comment
    upload_comment(req,res){
        // userID, shopID, text_content, picture(binary), time, score
        const commBody = req.body;
        DB.add_comment(commBody.userID,commBody.shopID,commBody.text_content,
            commBody.picture,commBody.time,commBody.score,
            function(err,msg){
                if(err)
                    res.end(msg);
                else 
                    res.end(msg);
            });
    }

    get_shopComm(req,res){
        // using shopID to get total comment about this shop
        DB.get_comments(req.query.shopID,function(err,msg){
            if(err)
                res.end(msg);
            else
                res.end(JSON.stringify(msg)); // array of json_obj, need to be stringify
        })
    }
}

module.exports = {
    UserService: new UserService()
}