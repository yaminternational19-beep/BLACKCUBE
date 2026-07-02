from rest_framework import serializers
from .models import PortfolioItem, PortfolioCategory, Technology, TeamRole, PortfolioMethod, TeamMember

class PortfolioItemSerializer(serializers.ModelSerializer):
    technologies = serializers.ListField(
        child=serializers.CharField(), required=False, write_only=True
    )
    methods = serializers.ListField(
        child=serializers.CharField(), required=False, write_only=True
    )
    team = serializers.ListField(
        child=serializers.DictField(), required=False, write_only=True
    )

    class Meta:
        model = PortfolioItem
        fields = [
            'id', 'title', 'description', 'category', 'technologies', 'client', 
            'app_store_url', 'google_store_url', 'website_url',
            'image', 'featured', 'coverImage', 'timeTaken', 
            'startDate', 'completedDate', 'methods', 'team',
            'created_at', 'updated_at', 'index_value'
        ]

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['technologies'] = [t.name for t in instance.technologies.all()]
        ret['methods'] = [m.name for m in instance.methods.all()]
        
        # Group team by role
        team_data = {}
        for tm in instance.team_members.all():
            role_name = tm.role.name if tm.role else 'Member'
            if role_name not in team_data:
                team_data[role_name] = []
            team_data[role_name].append(tm.name)
        
        ret['team'] = [{'role': k, 'people': v} for k, v in team_data.items()]
        return ret

    def _handle_nested(self, instance, validated_data):

        # Technologies
        techs = validated_data.pop('technologies', None)
        if techs is not None:
            tech_objs = []
            for t in techs:
                obj, _ = Technology.objects.get_or_create(name=t)
                tech_objs.append(obj)
            instance.technologies.set(tech_objs)

        # Methods
        methods = validated_data.pop('methods', None)
        if methods is not None:
            instance.methods.all().delete()
            for m in methods:
                PortfolioMethod.objects.create(portfolio_item=instance, name=m)

        # Team
        team = validated_data.pop('team', None)
        if team is not None:
            instance.team_members.all().delete()
            for group in team:
                role_name = group.get('role', 'Member')
                people = group.get('people', [])
                role_obj, _ = TeamRole.objects.get_or_create(name=role_name)
                for person in people:
                    TeamMember.objects.create(portfolio_item=instance, role=role_obj, name=person)

    def create(self, validated_data):
        tech_data = validated_data.pop('technologies', None)
        methods_data = validated_data.pop('methods', None)
        team_data = validated_data.pop('team', None)
        
        instance = super().create(validated_data)
        
        self._handle_nested(instance, {
            'technologies': tech_data,
            'methods': methods_data,
            'team': team_data
        })
        return instance

    def update(self, instance, validated_data):
        tech_data = validated_data.pop('technologies', None)
        methods_data = validated_data.pop('methods', None)
        team_data = validated_data.pop('team', None)
        
        instance = super().update(instance, validated_data)
        
        self._handle_nested(instance, {
            'technologies': tech_data,
            'methods': methods_data,
            'team': team_data
        })
        return instance
