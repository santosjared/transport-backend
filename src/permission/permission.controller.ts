import { Controller, Get } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { ApiTags } from "@nestjs/swagger";


@Controller('permissions')
@ApiTags('permissions')
export class PermissionController{
    constructor(private readonly permissionService:PermissionService) {}

    @Get()
    async findAll(){
        return await this.permissionService.findAll()
    }
}